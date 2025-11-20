/**
 * 青春追梦网站 - 后端API模拟
 * 模拟RESTful API接口，提供留言数据管理功能
 */

// API配置
const API_CONFIG = {
    baseUrl: '/api',
    version: '1.0',
    storageKey: 'youth_messages_api_data'
};

// 模拟数据库
class MessageDatabase {
    constructor() {
        this.initDatabase();
    }

    // 初始化数据库
    initDatabase() {
        if (!localStorage.getItem(API_CONFIG.storageKey)) {
            const initialData = {
                messages: [],
                metadata: {
                    totalMessages: 0,
                    lastUpdate: new Date().toISOString(),
                    version: API_CONFIG.version,
                    created: new Date().toISOString()
                },
                statistics: {
                    totalLikes: 0,
                    totalReplies: 0,
                    activeUsers: new Set()
                }
            };
            this.saveToStorage(initialData);
        }
    }

    // 获取所有数据
    getAllData() {
        return JSON.parse(localStorage.getItem(API_CONFIG.storageKey) || '{}');
    }

    // 保存数据到存储
    saveToStorage(data) {
        localStorage.setItem(API_CONFIG.storageKey, JSON.stringify(data, null, 2));
        return data;
    }

    // 生成唯一ID
    generateId(prefix = 'msg') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 模拟网络延迟
    async simulateDelay(ms = 100) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // API方法 - 获取留言列表
    async getMessages(params = {}) {
        await this.simulateDelay(50);
        
        const data = this.getAllData();
        let messages = data.messages || [];
        
        // 过滤已删除的消息
        messages = messages.filter(msg => msg.status !== 'deleted');
        
        // 支持分页
        const page = params.page || 1;
        const limit = params.limit || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        // 排序（最新优先）
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        const paginatedMessages = messages.slice(startIndex, endIndex);
        
        return {
            success: true,
            data: {
                messages: paginatedMessages,
                pagination: {
                    page,
                    limit,
                    total: messages.length,
                    totalPages: Math.ceil(messages.length / limit)
                },
                metadata: data.metadata
            }
        };
    }

    // API方法 - 创建新留言
    async createMessage(messageData) {
        await this.simulateDelay(200);
        
        const data = this.getAllData();
        
        // 验证数据
        if (!messageData.content || messageData.content.trim().length === 0) {
            return {
                success: false,
                error: '留言内容不能为空',
                code: 'VALIDATION_ERROR'
            };
        }

        if (messageData.content.length > 200) {
            return {
                success: false,
                error: '留言内容不能超过200字',
                code: 'VALIDATION_ERROR'
            };
        }

        // 创建新留言对象
        const newMessage = {
            id: this.generateId(),
            author: messageData.author || '匿名青年',
            content: messageData.content.trim(),
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: [],
            status: 'published',
            ip: messageData.ip || '127.0.0.1',
            userAgent: navigator.userAgent
        };

        // 添加到数据库
        data.messages.unshift(newMessage);
        
        // 更新元数据
        data.metadata.totalMessages = data.messages.length;
        data.metadata.lastUpdate = new Date().toISOString();
        
        // 更新统计
        if (messageData.author) {
            data.statistics.activeUsers.add(messageData.author);
        }

        this.saveToStorage(data);

        return {
            success: true,
            data: newMessage,
            message: '留言创建成功'
        };
    }

    // API方法 - 点赞留言
    async likeMessage(messageId) {
        await this.simulateDelay(100);
        
        const data = this.getAllData();
        const message = data.messages.find(msg => msg.id === messageId);
        
        if (!message) {
            return {
                success: false,
                error: '留言不存在',
                code: 'NOT_FOUND'
            };
        }

        if (message.status === 'deleted') {
            return {
                success: false,
                error: '留言已被删除',
                code: 'DELETED'
            };
        }

        // 增加点赞数
        message.likes += 1;
        data.statistics.totalLikes += 1;
        data.metadata.lastUpdate = new Date().toISOString();

        this.saveToStorage(data);

        return {
            success: true,
            data: {
                messageId,
                likes: message.likes
            },
            message: '点赞成功'
        };
    }

    // API方法 - 回复留言
    async replyToMessage(messageId, replyData) {
        await this.simulateDelay(150);
        
        const data = this.getAllData();
        const message = data.messages.find(msg => msg.id === messageId);
        
        if (!message) {
            return {
                success: false,
                error: '留言不存在',
                code: 'NOT_FOUND'
            };
        }

        if (!replyData.content || replyData.content.trim().length === 0) {
            return {
                success: false,
                error: '回复内容不能为空',
                code: 'VALIDATION_ERROR'
            };
        }

        // 创建回复对象
        const newReply = {
            id: this.generateId('reply'),
            author: replyData.author || '匿名用户',
            content: replyData.content.trim(),
            timestamp: new Date().toISOString()
        };

        // 添加到回复列表
        message.replies.push(newReply);
        data.statistics.totalReplies += 1;
        data.metadata.lastUpdate = new Date().toISOString();

        this.saveToStorage(data);

        return {
            success: true,
            data: newReply,
            message: '回复成功'
        };
    }

    // API方法 - 删除留言（软删除）
    async deleteMessage(messageId) {
        await this.simulateDelay(100);
        
        const data = this.getAllData();
        const message = data.messages.find(msg => msg.id === messageId);
        
        if (!message) {
            return {
                success: false,
                error: '留言不存在',
                code: 'NOT_FOUND'
            };
        }

        // 软删除
        message.status = 'deleted';
        message.deletedAt = new Date().toISOString();
        data.metadata.lastUpdate = new Date().toISOString();

        this.saveToStorage(data);

        return {
            success: true,
            message: '留言删除成功'
        };
    }

    // API方法 - 获取统计信息
    async getStatistics() {
        await this.simulateDelay(50);
        
        const data = this.getAllData();
        
        return {
            success: true,
            data: {
                ...data.statistics,
                activeUsersCount: data.statistics.activeUsers.size,
                metadata: data.metadata
            }
        };
    }

    // API方法 - 导出数据
    async exportData(format = 'json') {
        await this.simulateDelay(300);
        
        const data = this.getAllData();
        
        if (format === 'json') {
            return {
                success: true,
                data: data,
                format: 'json'
            };
        } else {
            return {
                success: false,
                error: '不支持的导出格式',
                code: 'UNSUPPORTED_FORMAT'
            };
        }
    }
}

// 创建全局API实例
window.youthMessageAPI = new MessageDatabase();

// RESTful API接口
window.YouthMessageAPI = {
    // 获取留言列表
    async getMessages(params = {}) {
        return await youthMessageAPI.getMessages(params);
    },

    // 创建留言
    async createMessage(messageData) {
        return await youthMessageAPI.createMessage(messageData);
    },

    // 点赞留言
    async likeMessage(messageId) {
        return await youthMessageAPI.likeMessage(messageId);
    },

    // 回复留言
    async replyToMessage(messageId, replyData) {
        return await youthMessageAPI.replyToMessage(messageId, replyData);
    },

    // 删除留言
    async deleteMessage(messageId) {
        return await youthMessageAPI.deleteMessage(messageId);
    },

    // 获取统计信息
    async getStatistics() {
        return await youthMessageAPI.getStatistics();
    },

    // 导出数据
    async exportData(format = 'json') {
        return await youthMessageAPI.exportData(format);
    }
};

// 控制台调试工具
if (console && console.log) {
    console.log('青春追梦网站后端API已加载');
    console.log('可用方法:', Object.keys(window.YouthMessageAPI));
}
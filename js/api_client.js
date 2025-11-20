/**
 * 青春追梦网站 - 前端API客户端
 * 与真实后端API通信
 */

const API_BASE_URL = 'http://localhost:3001/api';

class ApiClient {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    // 通用请求方法
    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API请求失败:', error);
            throw new Error('网络错误，请检查后端服务器是否启动');
        }
    }

    // 获取留言列表
    async getMessages(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/messages?${queryString}`);
    }

    // 创建留言
    async createMessage(messageData) {
        return await this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
    }

    // 点赞留言
    async likeMessage(messageId) {
        return await this.request(`/messages/${messageId}/like`, {
            method: 'POST'
        });
    }

    // 回复留言
    async replyToMessage(messageId, replyData) {
        return await this.request(`/messages/${messageId}/replies`, {
            method: 'POST',
            body: JSON.stringify(replyData)
        });
    }

    // 获取统计信息
    async getStatistics() {
        return await this.request('/statistics');
    }
}

// 创建全局API客户端实例
window.youthApiClient = new ApiClient();

// 兼容旧接口
window.YouthMessageAPI = {
    async getMessages(params = {}) {
        return await youthApiClient.getMessages(params);
    },

    async createMessage(messageData) {
        return await youthApiClient.createMessage(messageData);
    },

    async likeMessage(messageId) {
        return await youthApiClient.likeMessage(messageId);
    },

    async replyToMessage(messageId, replyData) {
        return await youthApiClient.replyToMessage(messageId, replyData);
    },

    async getStatistics() {
        return await youthApiClient.getStatistics();
    }
};
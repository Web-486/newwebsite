const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // 服务前端文件

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'data/messages.json');

// 确保数据文件存在
function ensureDataFile() {
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = {
            messages: [],
            metadata: {
                totalMessages: 0,
                lastUpdate: new Date().toISOString(),
                version: '1.0',
                created: new Date().toISOString()
            },
            statistics: {
                totalLikes: 0,
                totalReplies: 0,
                activeUsers: []
            }
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// 读取数据
function readData() {
    ensureDataFile();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// 写入数据
function writeData(data) {
    data.metadata.lastUpdate = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return data;
}

// API路由
app.get('/api/messages', (req, res) => {
    try {
        const data = readData();
        let messages = data.messages.filter(msg => msg.status !== 'deleted');
        
        // 分页和排序
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const startIndex = (page - 1) * limit;
        
        // 按时间倒序
        messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        const paginatedMessages = messages.slice(startIndex, startIndex + limit);
        
        res.json({
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
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '读取数据失败',
            code: 'SERVER_ERROR'
        });
    }
});

app.post('/api/messages', (req, res) => {
    try {
        const { author, content } = req.body;
        
        if (!content || content.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: '留言内容不能为空',
                code: 'VALIDATION_ERROR'
            });
        }

        if (content.length > 200) {
            return res.status(400).json({
                success: false,
                error: '留言内容不能超过200字',
                code: 'VALIDATION_ERROR'
            });
        }

        const data = readData();
        
        const newMessage = {
            id: uuidv4(),
            author: author || '匿名青年',
            content: content.trim(),
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: [],
            status: 'published',
            ip: req.ip,
            userAgent: req.get('User-Agent')
        };

        data.messages.unshift(newMessage);
        data.metadata.totalMessages = data.messages.length;
        
        // 更新活跃用户
        if (author && !data.statistics.activeUsers.includes(author)) {
            data.statistics.activeUsers.push(author);
        }

        writeData(data);

        res.json({
            success: true,
            data: newMessage,
            message: '留言创建成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '创建留言失败',
            code: 'SERVER_ERROR'
        });
    }
});

app.post('/api/messages/:id/like', (req, res) => {
    try {
        const { id } = req.params;
        const data = readData();
        const message = data.messages.find(msg => msg.id === id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                error: '留言不存在',
                code: 'NOT_FOUND'
            });
        }

        message.likes += 1;
        data.statistics.totalLikes += 1;
        writeData(data);

        res.json({
            success: true,
            data: {
                messageId: id,
                likes: message.likes
            },
            message: '点赞成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '点赞失败',
            code: 'SERVER_ERROR'
        });
    }
});

app.post('/api/messages/:id/replies', (req, res) => {
    try {
        const { id } = req.params;
        const { author, content } = req.body;
        
        if (!content || content.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: '回复内容不能为空',
                code: 'VALIDATION_ERROR'
            });
        }

        const data = readData();
        const message = data.messages.find(msg => msg.id === id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                error: '留言不存在',
                code: 'NOT_FOUND'
            });
        }

        const newReply = {
            id: uuidv4(),
            author: author || '匿名用户',
            content: content.trim(),
            timestamp: new Date().toISOString()
        };

        message.replies.push(newReply);
        data.statistics.totalReplies += 1;
        writeData(data);

        res.json({
            success: true,
            data: newReply,
            message: '回复成功'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '回复失败',
            code: 'SERVER_ERROR'
        });
    }
});

app.get('/api/statistics', (req, res) => {
    try {
        const data = readData();
        res.json({
            success: true,
            data: {
                ...data.statistics,
                activeUsersCount: data.statistics.activeUsers.length,
                metadata: data.metadata
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: '获取统计失败',
            code: 'SERVER_ERROR'
        });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`青春追梦后端服务器运行在 http://localhost:${PORT}`);
    ensureDataFile();
});
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径（ES模块替代__dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3003;
const DATA_FILE = path.join(__dirname, 'data.json');

// 在线用户管理
const onlineUsers = new Map(); // socketId -> userInfo
const userSessions = new Map(); // userId -> socketIds

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // 静态文件服务

// 读取数据文件
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取数据文件失败:', error);
    return {
      messages: [],
      drawings: [],
      statistics: { totalMessages: 0, totalDrawings: 0, totalVisitors: 0 }
    };
  }
}

// 写入数据文件
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('写入数据文件失败:', error);
    return false;
  }
}

// 更新统计数据
function updateStatistics() {
  const data = readData();
  data.statistics.totalMessages = data.messages.length;
  data.statistics.totalDrawings = data.drawings.length;
  data.statistics.totalVisitors = Array.from(userSessions.keys()).length;
  writeData(data);
  return data.statistics;
}

// 广播在线人数
function broadcastOnlineCount() {
  const onlineCount = onlineUsers.size;
  io.emit('onlineCountUpdate', { onlineCount });
  console.log(`广播在线人数: ${onlineCount}`);
}

// 清理过期用户
function cleanupExpiredUsers() {
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;
  
  for (const [socketId, userInfo] of onlineUsers.entries()) {
    if (now - userInfo.lastActive > FIVE_MINUTES) {
      // 用户超时，移除
      onlineUsers.delete(socketId);
      
      const userSockets = userSessions.get(userInfo.userId) || [];
      const updatedSockets = userSockets.filter(id => id !== socketId);
      
      if (updatedSockets.length === 0) {
        userSessions.delete(userInfo.userId);
      } else {
        userSessions.set(userInfo.userId, updatedSockets);
      }
      
      console.log(`清理过期用户: ${userInfo.userId}`);
    }
  }
  
  broadcastOnlineCount();
}

// WebSocket连接处理
io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);
  
  // 用户登录
  socket.on('userLogin', (userData) => {
    const { userId, userName } = userData;
    
    // 存储用户信息
    onlineUsers.set(socket.id, {
      userId,
      userName: userName || '匿名用户',
      lastActive: Date.now(),
      socketId: socket.id
    });
    
    // 管理用户会话
    if (!userSessions.has(userId)) {
      userSessions.set(userId, []);
    }
    userSessions.get(userId).push(socket.id);
    
    console.log(`用户登录: ${userName} (${userId})`);
    broadcastOnlineCount();
    
    // 发送当前统计数据
    const stats = updateStatistics();
    socket.emit('statsUpdate', stats);
  });
  
  // 用户活动
  socket.on('userActivity', (userData) => {
    const userInfo = onlineUsers.get(socket.id);
    if (userInfo) {
      userInfo.lastActive = Date.now();
      onlineUsers.set(socket.id, userInfo);
    }
  });
  
  // 新留言
  socket.on('addMessage', async (messageData) => {
    const { userName, content, author } = messageData;
    const messageAuthor = userName || author || '匿名用户';
    const data = readData();
    
    // 计算新的顺序id
    const maxId = data.messages.length > 0 
      ? Math.max(...data.messages.map(msg => msg.id))
      : 0;
    
    const newMessage = {
      id: maxId + 1,
      author: messageAuthor,
      content: content,
      timestamp: Date.now()
    };
    
    data.messages.unshift(newMessage);
    
    if (writeData(data)) {
      // 广播新留言
      io.emit('messageAdded', newMessage);
      
      // 更新统计数据
      const stats = updateStatistics();
      io.emit('statsUpdate', stats);
      
      socket.emit('messageSuccess', newMessage);
    } else {
      socket.emit('messageError', { error: '保存留言失败' });
    }
  });
  
  // 断开连接
  socket.on('disconnect', () => {
    const userInfo = onlineUsers.get(socket.id);
    if (userInfo) {
      onlineUsers.delete(socket.id);
      
      const userSockets = userSessions.get(userInfo.userId) || [];
      const updatedSockets = userSockets.filter(id => id !== socket.id);
      
      if (updatedSockets.length === 0) {
        userSessions.delete(userInfo.userId);
      } else {
        userSessions.set(userInfo.userId, updatedSockets);
      }
      
      console.log(`用户断开: ${userInfo.userName} (${userInfo.userId})`);
      broadcastOnlineCount();
    }
  });
});

// REST API路由（保持兼容性）

// 获取所有留言
app.get('/api/messages', (req, res) => {
  const data = readData();
  res.json(data.messages);
});

// 添加新留言
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  const data = readData();
  
  const maxId = data.messages.length > 0 
    ? Math.max(...data.messages.map(msg => msg.id))
    : 0;
  
  const newMessage = {
    id: maxId + 1,
    author: author || '',
    content: content,
    timestamp: Date.now()
  };
  
  data.messages.unshift(newMessage);
  
  if (writeData(data)) {
    // 通过WebSocket广播
    io.emit('messageAdded', newMessage);
    const stats = updateStatistics();
    io.emit('statsUpdate', stats);
    
    res.json(newMessage);
  } else {
    res.status(500).json({ error: '保存留言失败' });
  }
});

// 获取统计数据
app.get('/api/statistics', (req, res) => {
  const data = readData();
  res.json(data.statistics);
});

// 默认路由 - 服务前端页面
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 启动定时清理任务
setInterval(cleanupExpiredUsers, 60000); // 每分钟清理一次

server.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log('WebSocket服务已启动');
});
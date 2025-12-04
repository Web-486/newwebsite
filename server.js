import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径（ES模块替代__dirname）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

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
      onlineUsers: [],
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

// API路由

// 获取所有留言
app.get('/api/messages', (req, res) => {
  const data = readData();
  res.json(data.messages);
});

// 添加新留言
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  const data = readData();
  
  // 计算新的顺序id（当前最大id + 1）
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
  data.statistics.totalMessages = data.messages.length;
  
  if (writeData(data)) {
    res.json(newMessage);
  } else {
    res.status(500).json({ error: '保存留言失败' });
  }
});

// 删除留言
app.delete('/api/messages/:id', (req, res) => {
  const data = readData();
  const messageId = parseInt(req.params.id);
  const messageIndex = data.messages.findIndex(msg => msg.id === messageId);
  
  if (messageIndex === -1) {
    return res.status(404).json({ error: '留言不存在' });
  }
  
  const deletedMessage = data.messages.splice(messageIndex, 1)[0];
  data.statistics.totalMessages = data.messages.length;
  
  if (writeData(data)) {
    res.json({ success: true, deletedMessage });
  } else {
    res.status(500).json({ error: '删除留言失败' });
  }
});

// 获取统计数据
app.get('/api/statistics', (req, res) => {
  const data = readData();
  res.json(data.statistics);
});

// 更新在线用户
app.post('/api/online-users', (req, res) => {
  const { userId, userName } = req.body;
  const data = readData();
  
  // 清理过期用户（5分钟）
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  data.onlineUsers = data.onlineUsers.filter(user => user.lastActive > fiveMinutesAgo);
  
  // 更新或添加用户
  const existingUserIndex = data.onlineUsers.findIndex(user => user.id === userId);
  if (existingUserIndex !== -1) {
    data.onlineUsers[existingUserIndex].lastActive = Date.now();
  } else {
    data.onlineUsers.push({
      id: userId,
      name: userName || '匿名用户',
      lastActive: Date.now()
    });
    data.statistics.totalVisitors++;
  }
  
  writeData(data);
  res.json({ onlineCount: data.onlineUsers.length });
});

// 保存涂鸦
app.post('/api/drawings', (req, res) => {
  const { drawingData } = req.body;
  const data = readData();
  
  const newDrawing = {
    id: Date.now(),
    data: drawingData,
    timestamp: Date.now()
  };
  
  data.drawings.push(newDrawing);
  data.statistics.totalDrawings = data.drawings.length;
  
  if (writeData(data)) {
    res.json(newDrawing);
  } else {
    res.status(500).json({ error: '保存涂鸦失败' });
  }
});

// 默认路由 - 服务前端页面
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
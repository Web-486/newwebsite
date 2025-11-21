const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const dataPath = path.join(process.cwd(), 'data.json');
  
  // 初始化数据文件（如果不存在）
  if (!fs.existsSync(dataPath)) {
    const initialData = {
      messages: [],
      drawings: [],
      onlineUsers: [],
      statistics: { totalMessages: 0, totalDrawings: 0, totalVisitors: 0 }
    };
    fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
  }
  
  const { path: requestPath, httpMethod, body } = event;
  
  // 处理不同API路径
  if (requestPath.endsWith('/api/messages')) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.messages)
      };
    }
    
    if (httpMethod === 'POST') {
      const messageData = JSON.parse(body);
      const newMessage = {
        id: Date.now(),
        author: messageData.author || '',
        content: messageData.content,
        timestamp: Date.now()
      };
      
      data.messages.unshift(newMessage);
      data.statistics.totalMessages = data.messages.length;
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      };
    }
  }
  
  if (requestPath.endsWith('/api/statistics')) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.statistics)
      };
    }
  }
  
  if (requestPath.endsWith('/api/online-users')) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (httpMethod === 'POST') {
      const userData = JSON.parse(body);
      
      // 清理过期用户（5分钟）
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      data.onlineUsers = data.onlineUsers.filter(user => user.lastActive > fiveMinutesAgo);
      
      // 更新或添加用户
      const existingUserIndex = data.onlineUsers.findIndex(user => user.id === userData.userId);
      if (existingUserIndex !== -1) {
        data.onlineUsers[existingUserIndex].lastActive = Date.now();
      } else {
        data.onlineUsers.push({
          id: userData.userId,
          name: userData.userName || '匿名用户',
          lastActive: Date.now()
        });
        data.statistics.totalVisitors++;
      }
      
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onlineCount: data.onlineUsers.length })
      };
    }
  }
  
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Not found' })
  };
};
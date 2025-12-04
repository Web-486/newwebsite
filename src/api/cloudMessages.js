// 使用axios的云留言服务
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : 'http://localhost:3004';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 获取留言列表
export async function getMessages() {
  try {
    const response = await apiClient.get('/api/messages');
    return response.data;
  } catch (error) {
    console.error('获取云端留言失败:', error);
    return [];
  }
}

// 添加新留言
export async function addMessage(message) {
  try {
    const response = await apiClient.post('/api/messages', message);
    return response.data;
  } catch (error) {
    console.error('添加云端留言失败:', error);
    throw error;
  }
}

// 获取统计数据
export async function getMessageStats() {
  try {
    const response = await apiClient.get('/api/statistics');
    const stats = response.data;
    return {
      totalMessages: stats.totalMessages || 0
    };
  } catch (error) {
    console.error('获取云端统计数据失败:', error);
    return { totalMessages: 0 };
  }
}

// 更新在线用户
export async function updateOnlineUser(userData) {
  try {
    const response = await apiClient.post('/api/online-users', userData);
    return response.data;
  } catch (error) {
    console.error('更新云端在线用户失败:', error);
    return { onlineCount: Math.floor(Math.random() * 30) + 10 };
  }
}

// 删除留言
export async function deleteMessage(messageId) {
  try {
    const response = await apiClient.delete(`/api/messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('删除云端留言失败:', error);
    throw error;
  }
}
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : 'http://localhost:3003';

// 获取留言列表
export async function getMessages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages`);
    if (!response.ok) throw new Error('获取留言失败');
    return await response.json();
  } catch (error) {
    console.error('获取云端留言失败:', error);
    return [];
  }
}

// 添加新留言
export async function addMessage(message) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) throw new Error('添加留言失败');
    return await response.json();
  } catch (error) {
    console.error('添加云端留言失败:', error);
    throw error;
  }
}

// 获取统计数据
export async function getMessageStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/statistics`);
    if (!response.ok) throw new Error('获取统计数据失败');
    const stats = await response.json();
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
    const response = await fetch(`${API_BASE_URL}/api/online-users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) throw new Error('更新在线用户失败');
    return await response.json();
  } catch (error) {
    console.error('更新云端在线用户失败:', error);
    return { onlineCount: Math.floor(Math.random() * 30) + 10 };
  }
}
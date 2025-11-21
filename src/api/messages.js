// 留言API服务
const MESSAGES_KEY = 'youthDreamMessages'

// 获取留言列表
export function getMessages() {
  try {
    // 尝试从localStorage读取，如果不存在则使用默认数据
    const saved = localStorage.getItem(MESSAGES_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
    
    // 默认留言数据
    const defaultMessages = [
      {
        id: Date.now() - 86400000 * 3, // 3天前
        author: '青春追梦者',
        content: '青春是用来奋斗的，不是用来挥霍的！让我们一起加油！',
        timestamp: new Date('2025-01-01T08:00:00').getTime()
      },
      {
        id: Date.now() - 86400000 * 2, // 2天前
        author: '追梦少年',
        content: '每一次努力都是向梦想靠近的一步，坚持就是胜利！',
        timestamp: new Date('2025-01-02T10:30:00').getTime()
      },
      {
        id: Date.now() - 86400000, // 1天前
        author: '',
        content: '让青春在奋斗中闪光，让梦想在坚持中绽放！',
        timestamp: new Date('2025-01-03T14:15:00').getTime()
      }
    ]
    
    // 保存默认数据到localStorage
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(defaultMessages))
    return defaultMessages
  } catch (error) {
    console.error('获取留言失败:', error)
    return []
  }
}

// 添加新留言
export function addMessage(message) {
  try {
    const messages = getMessages()
    const newMessage = {
      id: Date.now(),
      author: message.author || '',
      content: message.content,
      timestamp: new Date().getTime()
    }
    
    messages.unshift(newMessage)
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
    return newMessage
  } catch (error) {
    console.error('添加留言失败:', error)
    throw error
  }
}

// 删除留言
export function deleteMessage(messageId) {
  try {
    const messages = getMessages()
    const filteredMessages = messages.filter(msg => msg.id !== messageId)
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(filteredMessages))
    return true
  } catch (error) {
    console.error('删除留言失败:', error)
    throw error
  }
}

// 获取留言统计
export function getMessageStats() {
  const messages = getMessages()
  return {
    total: messages.length,
    today: messages.filter(msg => {
      const msgDate = new Date(msg.timestamp)
      const today = new Date()
      return msgDate.toDateString() === today.toDateString()
    }).length
  }
}

// 导出留言数据为JSON文件
export function exportMessages() {
  const messages = getMessages()
  const dataStr = JSON.stringify(messages, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const link = document.createElement('a')
  link.href = URL.createObjectURL(dataBlob)
  link.download = 'youth_dream_messages.json'
  link.click()
  
  URL.revokeObjectURL(link.href)
}

// 导入留言数据
export function importMessages(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const importedMessages = JSON.parse(e.target.result)
        
        // 验证数据格式
        if (!Array.isArray(importedMessages)) {
          throw new Error('导入的数据格式不正确')
        }
        
        // 验证每个留言对象的格式
        const validMessages = importedMessages.filter(msg => 
          msg && typeof msg === 'object' && 
          msg.content && typeof msg.content === 'string'
        )
        
        // 合并现有留言和导入的留言（去重）
        const existingMessages = getMessages()
        const existingIds = new Set(existingMessages.map(msg => msg.id))
        const newMessages = validMessages.filter(msg => !existingIds.has(msg.id))
        
        const mergedMessages = [...newMessages, ...existingMessages]
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(mergedMessages))
        
        resolve({
          total: mergedMessages.length,
          imported: newMessages.length,
          skipped: validMessages.length - newMessages.length
        })
      } catch (error) {
        reject(new Error('导入失败：文件格式不正确'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'))
    }
    
    reader.readAsText(file)
  })
}
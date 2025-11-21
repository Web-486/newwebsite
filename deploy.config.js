// 部署配置文件
module.exports = {
  // 服务器配置
  server: {
    port: process.env.PORT || 3003,
    host: '0.0.0.0'
  },
  
  // 数据库配置（如果使用数据库）
  database: {
    // 可以配置MongoDB、MySQL等数据库连接
    // 示例：MongoDB Atlas连接字符串
    // mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/youthdream'
  },
  
  // 静态文件配置
  static: {
    // 静态文件目录
    publicDir: 'dist',
    // 缓存设置
    maxAge: 86400000 // 24小时
  },
  
  // WebSocket配置
  websocket: {
    // 心跳检测间隔（毫秒）
    pingInterval: 25000,
    // 心跳超时时间（毫秒）
    pingTimeout: 60000,
    // 允许跨域
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.com'] 
        : ['http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET', 'POST']
    }
  },
  
  // 安全配置
  security: {
    // 请求频率限制
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 100 // 每个IP最多100个请求
    },
    // CORS配置
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : true,
      credentials: true
    }
  },
  
  // 日志配置
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/app.log'
  }
};
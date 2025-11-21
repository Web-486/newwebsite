# 青春梦想留言墙 - 部署指南

## 项目概述

青春梦想留言墙是一个基于 Vue 3 + Vite + Express + Socket.IO 的实时留言应用，支持在线人数统计、实时留言更新等功能。

## 部署方式

### 1. 传统服务器部署（推荐）

#### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器
- 云服务器（如阿里云、腾讯云等）

#### 部署步骤

1. **服务器准备**

   ```bash
   # 更新系统
   sudo apt update && sudo apt upgrade -y

   # 安装Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # 验证安装
   node --version
   npm --version
   ```

2. **上传项目文件**

   ```bash
   # 使用git克隆项目
   git clone <your-repo-url>
   cd vite-project3

   # 或者使用FTP/SFTP上传项目文件
   ```

3. **安装依赖**

   ```bash
   npm install
   ```

4. **配置环境变量**

   ```bash
   # 复制环境变量示例文件
   cp .env.example .env

   # 编辑配置文件
   nano .env
   ```

   修改以下关键配置：

   ```env
   PORT=3003
   NODE_ENV=production
   HOST=0.0.0.0
   VITE_API_BASE_URL=http://your-domain.com:3003
   VITE_WS_URL=ws://your-domain.com:3003
   ```

5. **构建前端应用**

   ```bash
   npm run build
   ```

6. **启动服务**

   ```bash
   # 使用npm启动（开发模式）
   npm run start-dev

   # 或者使用PM2进行进程管理（生产环境推荐）
   npm install -g pm2
   pm2 start npm --name "youthdream" -- run start-dev
   pm2 save
   pm2 startup
   ```

7. **配置 Nginx 反向代理（可选但推荐）**

   ```bash
   # 安装Nginx
   sudo apt install nginx -y

   # 创建Nginx配置文件
   sudo nano /etc/nginx/sites-available/youthdream
   ```

   配置文件内容：

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       # 静态文件服务
       location / {
           root /path/to/your/project/dist;
           try_files $uri $uri/ /index.html;
       }

       # API代理
   location /api/ {
       proxy_pass http://localhost:3003;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # WebSocket代理
   location /socket.io/ {
       proxy_pass http://localhost:3003;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "Upgrade";
           proxy_set_header Host $host;
       }
   }
   ```

   启用站点：

   ```bash
   sudo ln -s /etc/nginx/sites-available/youthdream /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### 2. Docker 部署

#### 创建 Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
   EXPOSE 3003

# 启动应用
CMD ["npm", "run", "start-dev"]
```

#### 创建 docker-compose.yml

```yaml
version: "3.8"
services:
  youthdream:
    build: .
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
```

#### 部署命令

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 3. 云平台部署

#### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置构建设置：
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
3. 添加环境变量

#### Netlify 部署

1. 拖拽 dist 文件夹到 Netlify
2. 或连接 Git 仓库自动部署
3. 配置重定向规则：
   ```
   /* /index.html 200
   ```

## 环境配置

### 生产环境优化

1. **启用 Gzip 压缩**

   ```javascript
   // 在server-with-websocket.js中添加
   app.use(compression());
   ```

2. **设置安全头**

   ```javascript
   app.use(helmet());
   ```

3. **配置 HTTPS**

   ```javascript
   const https = require("https");
   const fs = require("fs");

   const options = {
     key: fs.readFileSync("/path/to/private.key"),
     cert: fs.readFileSync("/path/to/certificate.crt"),
   };

   const server = https.createServer(options, app);
   ```

### 监控和日志

1. **启用日志记录**

   ```bash
   # 使用PM2日志管理
   pm2 logs youthdream

   # 或配置自定义日志
   npm install winston
   ```

2. **性能监控**
   ```bash
   # 安装监控工具
   npm install -g clinic
   clinic doctor -- node server-with-websocket.js
   ```

## 故障排除

### 常见问题

1. **端口被占用**

   ```bash
   # 查找占用端口的进程
   lsof -i :3003
   # 或
   netstat -tulpn | grep :3003
   ```

2. **WebSocket 连接失败**

   - 检查防火墙设置
   - 验证 Nginx 代理配置
   - 检查 SSL 证书

3. **静态文件 404 错误**
   - 确认 dist 目录存在
   - 检查 Nginx root 路径配置
   - 验证文件权限

### 性能优化建议

1. **启用缓存**

   - 使用 Redis 存储会话数据
   - 配置 CDN 加速静态资源

2. **数据库优化**

   - 考虑使用 MongoDB 或 MySQL 替代文件存储
   - 实现数据分页和索引

3. **负载均衡**
   - 使用多个服务器实例
   - 配置 Redis 适配器用于 Socket.IO 集群

## 备份和恢复

### 数据备份

```bash
# 备份数据文件
cp data.json data-backup-$(date +%Y%m%d).json

# 定期备份脚本
0 2 * * * cp /path/to/project/data.json /backup/youthdream-data-$(date +%Y%m%d).json
```

### 恢复数据

```bash
# 停止服务
pm2 stop youthdream

# 恢复备份
cp backup-file.json data.json

# 重启服务
pm2 start youthdream
```

## 安全建议

1. **定期更新依赖**

   ```bash
   npm audit
   npm update
   ```

2. **配置防火墙**

   ```bash
   # 只开放必要端口
   ufw allow 80,443,3001
   ufw enable
   ```

3. **使用 HTTPS**
   - 申请免费 SSL 证书（Let's Encrypt）
   - 配置 HTTP 到 HTTPS 重定向

## 联系方式

如有部署问题，请联系开发团队或查看项目文档。

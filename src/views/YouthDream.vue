<template>
    <div class="youth-dream-page">
        <!-- 粒子动画容器 -->
        <div ref="particlesContainer" class="particles-container"></div>

        <header class="hero-section">
            <div class="container">
                <h1 class="main-title">青春追梦</h1>
                <p class="subtitle">奋斗的青春最美丽</p>
                <div class="stats-bar">
                    <div class="stat-item">
                        <span class="stat-number" id="onlineCount">{{ onlineCount }}</span>
                        <span class="stat-label">在线人数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="drawingCount">{{ drawingCount }}</span>
                        <span class="stat-label">涂鸦数量</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="messageCount">{{ messageCount }}</span>
                        <span class="stat-label">留言数量</span>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <section class="inspiration-section">
                <div class="container">
                    <div class="content-wrapper">
                        <h2 class="section-title">青春寄语</h2>
                        <div class="inspiration-text">
                            <p>
                                青春是生命中最绚烂的篇章，是梦想起航的港湾。在这个充满无限可能的年纪，我们怀揣着对未来的憧憬，肩负着时代的使命。
                            </p>
                            <p>
                                每一次奋斗都是青春的注脚，每一次坚持都是梦想的阶梯。不要畏惧前方的风雨，因为正是这些历练让我们变得更加坚强。
                            </p>
                            <p>
                                让青春在奋斗中闪光，让梦想在坚持中绽放。相信自己，勇往直前，你就是那个能够改变世界的人！
                            </p>
                        </div>
                        <button class="cta-button" @click="showInspiration">开启追梦之旅</button>
                    </div>
                </div>
            </section>

            <!-- 涂鸦墙区域 -->
            <section class="drawing-section">
                <div class="container">
                    <h2 class="section-title">创意涂鸦墙</h2>
                    <p class="section-subtitle">用色彩描绘你的青春梦想</p>

                    <div class="drawing-tools">
                        <div class="tool-group">
                            <label>画笔颜色：</label>
                            <input type="color" v-model="brushColor" />
                            <div class="color-presets">
                                <div v-for="color in colorPresets" :key="color" class="color-option"
                                    :class="{ active: brushColor === color }" :style="{ backgroundColor: color }"
                                    @click="brushColor = color"></div>
                            </div>
                        </div>

                        <div class="tool-group">
                            <label>画笔大小：</label>
                            <input type="range" v-model="brushSize" min="1" max="20" />
                            <span>{{ brushSize }}px</span>
                        </div>

                        <div class="tool-group">
                            <button class="tool-button" @click="clearCanvas">清空画布</button>
                            <button class="tool-button" @click="saveDrawing">保存涂鸦</button>
                        </div>

                        <div class="tool-group">
                            <label>画布背景：</label>
                            <div class="background-presets">
                                <div v-for="bg in backgroundPresets" :key="bg.name" class="background-option"
                                    :class="{ active: currentBackground === bg.name }" :style="bg.style"
                                    @click="changeBackground(bg.name)"></div>
                            </div>
                        </div>
                    </div>

                    <div class="drawing-canvas-container">
                        <canvas ref="drawingCanvas" width="800" height="400" @mousedown="startDrawing" @mousemove="draw"
                            @mouseup="stopDrawing" @mouseleave="stopDrawing" @touchstart="startDrawingTouch"
                            @touchmove="drawTouch" @touchend="stopDrawing"></canvas>
                    </div>
                </div>
            </section>

            <!-- 留言墙区域 -->
            <section class="message-section">
                <div class="container">
                    <div class="message-header">
                        <h2 class="section-title">青春留言墙</h2>
                        <br>
                        <p class="section-subtitle">分享你的青春故事与梦想</p>
                    </div>

                    <div class="message-form">
                        <div class="form-group">
                            <input type="text" v-model="userName" placeholder="你的昵称（可选）" maxlength="20" />
                        </div>
                        <div class="form-group">
                            <textarea v-model="messageContent" placeholder="写下你的青春寄语或梦想..." maxlength="200"
                                @input="updateCharCount"></textarea>
                            <div class="char-count">
                                <span>{{ charRemaining }}</span> 字剩余
                            </div>
                        </div>
                        <button class="submit-button" @click="submitMessage">发布留言</button>
                    </div>

                    <div class="messages-container">
                        <div v-if="messages.length === 0" class="no-messages">
                            暂无留言，快来分享你的青春故事吧！
                        </div>
                        <div v-else>
                            <div v-for="message in messages" :key="message.id" class="message-item">
                                <div class="message-header">
                                    <span class="message-author">{{ message.author || '匿名用户' }}</span>
                                    <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                                </div>
                                <div class="message-content">{{ message.content }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="footer-section">
            <div class="container">
                <p>&copy; 2025 青春追梦 - 青年奋斗正当时</p>
            </div>
        </footer>

        <!-- 励志语录模态框 -->
        <div v-if="showModal" class="inspiration-modal" @click="closeModal">
            <div class="modal-content" @click.stop>
                <p class="quote-text">{{ currentQuote }}</p>
                <button class="close-button" @click="closeModal">继续追梦</button>
            </div>
        </div>

        <!-- 通知组件 -->
        <div v-if="showNotification" class="notification">
            {{ notificationMessage }}
        </div>
    </div>
</template>

<script>
import { getMessages, addMessage, getMessageStats, updateOnlineUser } from '../api/cloudMessages.js'

export default {
    name: 'YouthDream',
    data() {
        return {
            // WebSocket连接
            socket: null,
            userId: null,

            // 统计数据
            onlineCount: 0,
            drawingCount: 0,
            messageCount: 0,

            // 涂鸦墙相关
            brushColor: '#667eea',
            brushSize: 5,
            isDrawing: false,
            lastX: 0,
            lastY: 0,

            // 颜色预设
            colorPresets: ['#667eea', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#000000'],

            // 背景预设
            backgroundPresets: [
                { name: 'white', style: { backgroundColor: 'white', border: '1px solid #ccc' } },
                {
                    name: 'grid', style: {
                        backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }
                },
                {
                    name: 'dots', style: {
                        backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }
                },
                {
                    name: 'gradient', style: {
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    }
                },
                {
                    name: 'paper', style: {
                        backgroundColor: '#f5f5dc',
                        backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }
                }
            ],
            currentBackground: 'white',

            // 留言墙相关
            userName: '',
            messageContent: '',
            charRemaining: 200,
            messages: [],

            // 励志语录
            inspirationalQuotes: [
                "青春不奋斗，要青春何用？",
                "梦想不会发光，发光的是追梦的你！",
                "每一次努力，都是向梦想靠近的一步。",
                "青春是用来奋斗的，不是用来挥霍的。",
                "你的坚持，终将美好！",
                "勇敢追梦，青春无悔！",
                "奋斗的青春最美丽！",
                "梦想还是要有的，万一实现了呢？",
                "年轻就是资本，奋斗就是投资！",
                "让青春在奋斗中闪光！"
            ],

            // 模态框和通知
            showModal: false,
            currentQuote: '',
            showNotification: false,
            notificationMessage: '',

            // 粒子系统
            particles: [],
            particleInterval: null,
            activityInterval: null,
            activityHandler: null
        }
    },
    mounted() {
        this.initParticleSystem()
        this.initMessageWall()
        this.initDrawingCanvas()
        this.loadDrawingCount() // 加载涂鸦数量
        this.initWebSocket() // 初始化WebSocket连接
        this.updateStatistics()

        // 定期清理过期用户
        setInterval(() => {
            this.cleanupExpiredUsers()
        }, 60000) // 每分钟清理一次
    },

    beforeUnmount() {
        if (this.socket) {
            this.socket.disconnect()
        }
        if (this.particleInterval) {
            clearInterval(this.particleInterval)
        }
        if (this.activityInterval) {
            clearInterval(this.activityInterval)
        }
        if (this.activityHandler) {
            document.removeEventListener('mousemove', this.activityHandler)
            document.removeEventListener('keydown', this.activityHandler)
            document.removeEventListener('click', this.activityHandler)
        }
    },
    methods: {
        // 初始化留言墙
        async initMessageWall() {
            try {
                this.messages = await getMessages();
                await this.updateStatistics();
            } catch (error) {
                console.error('初始化留言墙失败:', error);
                this.showNotification('留言墙初始化失败');
            }
        },

        // 提交留言
        async submitMessage() {
            if (!this.messageContent.trim()) {
                this.showNotification('请输入留言内容');
                return;
            }

            const messageData = {
                content: this.messageContent,
                timestamp: new Date().toISOString(),
                userName: this.userName || '匿名用户',
                userAvatar: this.getRandomAvatar()
            };

            // 如果WebSocket连接正常，通过WebSocket发送
            if (this.socket && this.socket.connected) {
                this.socket.emit('addMessage', messageData);
                this.messageContent = '';
                this.charRemaining = 200;
                this.showNotification('留言发布成功！');
            } else {
                // 回退到HTTP API
                try {
                    const newMessage = await addMessage(messageData);

                    this.messages.unshift(newMessage);
                    this.messageContent = '';
                    this.charRemaining = 200;
                    this.showNotification('留言发布成功！');

                    await this.updateStatistics();
                } catch (error) {
                    console.error('发布留言失败:', error);
                    this.showNotification('留言发布失败，请重试');
                }
            }
        },

        // 更新统计数据
        async updateStatistics() {
            try {
                const stats = await getMessageStats();
                this.messageCount = stats.totalMessages || stats.total || 0;
            } catch (error) {
                console.error('更新统计数据失败:', error);
            }
        },

        // 在线用户管理
        async initOnlineUsers() {
            const USER_ID_KEY = 'youthDreamUserId';

            // 生成或获取用户ID
            let userId = localStorage.getItem(USER_ID_KEY);
            if (!userId) {
                userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem(USER_ID_KEY, userId);
            }

            // 更新云端在线用户
            try {
                const result = await updateOnlineUser({
                    userId: userId,
                    userName: this.userName || '匿名用户'
                });
                this.onlineCount = result.onlineCount;
            } catch (error) {
                console.error('更新在线用户失败:', error);
                this.onlineCount = Math.floor(Math.random() * 30) + 10;
            }

            // 设置活动监听
            this.setupActivityListeners(userId);
        },

        async updateUserActivity(userId) {
            try {
                const result = await updateOnlineUser({
                    userId: userId,
                    userName: this.userName || '匿名用户'
                });
                this.onlineCount = result.onlineCount;
            } catch (error) {
                console.error('更新用户活动状态失败:', error);
            }
        },

        // WebSocket初始化
        initWebSocket() {
            const socketUrl = process.env.NODE_ENV === 'production'
                ? window.location.origin
                : 'http://localhost:3003';

            // 导入socket.io客户端
            import('socket.io-client').then(({ io }) => {
                this.socket = io(socketUrl);

                // 生成用户ID
                this.userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

                // 监听连接成功
                this.socket.on('connect', () => {
                    console.log('WebSocket连接成功');

                    // 发送用户登录信息
                    this.socket.emit('userLogin', {
                        userId: this.userId,
                        userName: this.userName || '匿名用户'
                    });

                    // 设置活动监听器
                    this.setupActivityListeners();
                });

                // 监听在线人数更新
                this.socket.on('onlineCountUpdate', (data) => {
                    this.onlineCount = data.onlineCount;
                });

                // 监听统计数据更新
                this.socket.on('statsUpdate', (stats) => {
                    this.messageCount = stats.totalMessages;
                });

                // 监听新留言
                this.socket.on('messageAdded', (newMessage) => {
                    this.messages.unshift(newMessage);
                });

                // 监听连接错误
                this.socket.on('connect_error', (error) => {
                    console.error('WebSocket连接失败:', error);
                    // 回退到本地存储方案
                    this.initOnlineUsers();
                });
            }).catch(error => {
                console.error('加载socket.io失败:', error);
                // 回退到本地存储方案
                this.initOnlineUsers();
            });
        },

        // 用户活动监听（WebSocket版本）
        setupActivityListeners() {
            this.activityHandler = () => {
                if (this.socket && this.socket.connected) {
                    this.socket.emit('userActivity', {
                        userId: this.userId
                    });
                }
            };

            document.addEventListener('mousemove', this.activityHandler);
            document.addEventListener('keydown', this.activityHandler);
            document.addEventListener('click', this.activityHandler);
        },

        // 粒子系统
        initParticleSystem() {
            const container = this.$refs.particlesContainer
            if (!container) return

            // 创建粒子
            for (let i = 0; i < 30; i++) {
                this.createParticle()
            }

            // 更新粒子位置
            this.particleInterval = setInterval(() => {
                this.updateParticles()
            }, 50)
        },

        createParticle() {
            const size = Math.random() * 3 + 1
            const particle = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: size,
                speed: Math.random() * 2 + 0.5,
                element: document.createElement('div')
            }

            particle.element.className = 'particle'
            particle.element.style.cssText = `
        width: ${particle.size}px;
        height: ${particle.size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        left: ${particle.x}px;
        top: ${particle.y}px;
      `

            this.$refs.particlesContainer.appendChild(particle.element)
            this.particles.push(particle)
        },

        updateParticles() {
            this.particles.forEach(particle => {
                particle.y -= particle.speed
                particle.x += Math.sin(particle.y * 0.01) * 0.5

                if (particle.y < -10) {
                    particle.y = window.innerHeight + 10
                    particle.x = Math.random() * window.innerWidth
                }

                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`
            })
        },

        // 涂鸦功能
        initDrawingCanvas() {
            const canvas = this.$refs.drawingCanvas
            if (!canvas) return

            this.ctx = canvas.getContext('2d')
            this.ctx.lineCap = 'round'
            this.ctx.lineJoin = 'round'
        },

        startDrawing(e) {
            this.isDrawing = true
            const rect = this.$refs.drawingCanvas.getBoundingClientRect()
            this.lastX = e.clientX - rect.left
            this.lastY = e.clientY - rect.top
        },

        startDrawingTouch(e) {
            e.preventDefault()
            this.isDrawing = true
            const rect = this.$refs.drawingCanvas.getBoundingClientRect()
            const touch = e.touches[0]
            this.lastX = touch.clientX - rect.left
            this.lastY = touch.clientY - rect.top
        },

        draw(e) {
            if (!this.isDrawing) return

            const rect = this.$refs.drawingCanvas.getBoundingClientRect()
            const currentX = e.clientX - rect.left
            const currentY = e.clientY - rect.top

            this.ctx.strokeStyle = this.brushColor
            this.ctx.lineWidth = this.brushSize

            this.ctx.beginPath()
            this.ctx.moveTo(this.lastX, this.lastY)
            this.ctx.lineTo(currentX, currentY)
            this.ctx.stroke()

            this.lastX = currentX
            this.lastY = currentY
        },

        drawTouch(e) {
            e.preventDefault()
            if (!this.isDrawing) return

            const rect = this.$refs.drawingCanvas.getBoundingClientRect()
            const touch = e.touches[0]
            const currentX = touch.clientX - rect.left
            const currentY = touch.clientY - rect.top

            this.ctx.strokeStyle = this.brushColor
            this.ctx.lineWidth = this.brushSize

            this.ctx.beginPath()
            this.ctx.moveTo(this.lastX, this.lastY)
            this.ctx.lineTo(currentX, currentY)
            this.ctx.stroke()

            this.lastX = currentX
            this.lastY = currentY
        },

        stopDrawing() {
            this.isDrawing = false
        },

        clearCanvas() {
            const canvas = this.$refs.drawingCanvas
            this.ctx.clearRect(0, 0, canvas.width, canvas.height)
            this.drawingCount++
            this.showNotification('画布已清空！')
        },

        saveDrawing() {
            const canvas = this.$refs.drawingCanvas
            const image = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.download = '青春涂鸦.png'
            link.href = image
            link.click()

            // 增加涂鸦数量统计
            this.drawingCount++
            this.saveDrawingCount()

            this.showNotification('涂鸦已保存！')
        },

        changeBackground(bgName) {
            this.currentBackground = bgName
            const canvas = this.$refs.drawingCanvas

            switch (bgName) {
                case 'white':
                    canvas.style.background = 'white'
                    break
                case 'grid':
                    canvas.style.background = 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)'
                    canvas.style.backgroundSize = '20px 20px'
                    break
                case 'dots':
                    canvas.style.background = 'radial-gradient(#e0e0e0 1px, transparent 1px)'
                    canvas.style.backgroundSize = '20px 20px'
                    break
                case 'gradient':
                    canvas.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    break
                case 'paper':
                    canvas.style.background = '#f5f5dc'
                    canvas.style.backgroundImage = 'linear-gradient(#e0e0e0 1px, transparent 1px)'
                    canvas.style.backgroundSize = '20px 20px'
                    break
            }
        },

        // 留言功能
        updateCharCount() {
            this.charRemaining = 200 - this.messageContent.length
        },

        async submitMessage() {
            if (!this.messageContent.trim()) {
                this.showNotification('请输入留言内容！')
                return
            }

            try {
                const newMessage = await addMessage({
                    author: this.userName.trim(),
                    content: this.messageContent.trim()
                });

                this.messages.unshift(newMessage);
                this.updateStatistics();

                // 清空表单
                this.messageContent = ''
                this.userName = ''
                this.charRemaining = 200

                this.showNotification('留言发布成功！');
            } catch (error) {
                console.error('发布留言失败:', error);
                this.showNotification('留言发布失败');
            }
        },





        formatTime(timestamp) {
            const date = new Date(timestamp)
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        },

        // 励志语录
        showInspiration() {
            const randomIndex = Math.floor(Math.random() * this.inspirationalQuotes.length)
            this.currentQuote = this.inspirationalQuotes[randomIndex]
            this.showModal = true
        },

        closeModal() {
            this.showModal = false
        },

        // 通知功能
        showNotification(message) {
            this.notificationMessage = message
            this.showNotification = true

            setTimeout(() => {
                this.showNotification = false
            }, 3000)
        },

        // 在线用户管理
        initOnlineUsers() {
            const ONLINE_USERS_KEY = 'youthDreamOnlineUsers'
            const USER_ID_KEY = 'youthDreamUserId'

            // 生成或获取用户ID
            let userId = localStorage.getItem(USER_ID_KEY)
            if (!userId) {
                userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
                localStorage.setItem(USER_ID_KEY, userId)
            }

            // 更新用户活动状态
            this.updateUserActivity(userId)

            // 设置活动监听器
            this.setupActivityListeners(userId)

            // 每30秒更新一次活动状态
            this.activityInterval = setInterval(() => {
                this.updateUserActivity(userId)
            }, 30000)
        },

        updateUserActivity(userId) {
            const ONLINE_USERS_KEY = 'youthDreamOnlineUsers'

            // 获取当前在线用户列表
            let onlineUsers = []
            try {
                const saved = localStorage.getItem(ONLINE_USERS_KEY)
                if (saved) {
                    onlineUsers = JSON.parse(saved)
                }
            } catch (error) {
                console.error('获取在线用户列表失败:', error)
            }

            // 添加或更新当前用户
            const currentUser = {
                id: userId,
                lastActive: Date.now(),
                userAgent: navigator.userAgent
            }

            // 移除过期用户（5分钟内没有活动的用户）
            const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
            onlineUsers = onlineUsers.filter(user => user.lastActive > fiveMinutesAgo)

            // 添加或更新当前用户
            const existingUserIndex = onlineUsers.findIndex(user => user.id === userId)
            if (existingUserIndex >= 0) {
                onlineUsers[existingUserIndex] = currentUser
            } else {
                onlineUsers.push(currentUser)
            }

            // 保存更新后的在线用户列表
            try {
                localStorage.setItem(ONLINE_USERS_KEY, JSON.stringify(onlineUsers))
                this.onlineCount = onlineUsers.length
            } catch (error) {
                console.error('保存在线用户列表失败:', error)
                // 如果保存失败，使用模拟数据
                this.onlineCount = Math.floor(Math.random() * 30) + 10
            }
        },

        setupActivityListeners(userId) {
            // 创建活动处理函数
            this.activityHandler = () => {
                this.updateUserActivity(userId)
            }

            // 监听用户活动
            document.addEventListener('mousemove', this.activityHandler)
            document.addEventListener('keydown', this.activityHandler)
            document.addEventListener('click', this.activityHandler)
        },

        // 涂鸦数量统计
        saveDrawingCount() {
            const DRAWING_COUNT_KEY = 'youthDreamDrawingCount'
            try {
                localStorage.setItem(DRAWING_COUNT_KEY, this.drawingCount.toString())
            } catch (error) {
                console.error('保存涂鸦数量失败:', error)
            }
        },

        loadDrawingCount() {
            const DRAWING_COUNT_KEY = 'youthDreamDrawingCount'
            try {
                const saved = localStorage.getItem(DRAWING_COUNT_KEY)
                if (saved) {
                    this.drawingCount = parseInt(saved) || 0
                }
            } catch (error) {
                console.error('加载涂鸦数量失败:', error)
                this.drawingCount = 0
            }
        },

        cleanupExpiredUsers() {
            const ONLINE_USERS_KEY = 'youthDreamOnlineUsers'

            try {
                const saved = localStorage.getItem(ONLINE_USERS_KEY)
                if (saved) {
                    let onlineUsers = JSON.parse(saved)

                    // 移除过期用户（5分钟内没有活动的用户）
                    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
                    onlineUsers = onlineUsers.filter(user => user.lastActive > fiveMinutesAgo)

                    // 保存清理后的列表
                    localStorage.setItem(ONLINE_USERS_KEY, JSON.stringify(onlineUsers))
                    this.onlineCount = onlineUsers.length
                }
            } catch (error) {
                console.error('清理过期用户失败:', error)
            }
        },

        // 统计数据
        async updateStatistics() {
            try {
                const stats = await getMessageStats()
                this.messageCount = stats.totalMessages
                // 涂鸦数量已经在saveDrawing和loadDrawingCount中处理
                // 这里不需要再设置drawingCount
            } catch (error) {
                console.error('获取统计数据失败:', error)
                // 如果获取失败，使用messages数组的长度
                this.messageCount = this.messages.length
            }
        }
    }
}
</script>

<style scoped>
/* 导入原有的CSS样式 */
@import url('../../css/AI_style.css');

/* 组件特定的样式 */
.youth-dream-page {
    position: relative;
    min-height: 100vh;
}

/* 模态框样式 */
.inspiration-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    background: white;
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    max-width: 500px;
    margin: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
}

.quote-text {
    font-size: 1.3rem;
    color: #667eea;
    margin-bottom: 20px;
    line-height: 1.6;
    font-weight: 500;
}

.close-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.close-button:hover {
    transform: scale(1.05);
}

/* 通知样式 */
/* .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2ecc71;
    color: white;
    padding: 15px 25px;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    animation: slideInRight 0.3s ease;
} */

/* 动画定义 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 删除通知相关动画 */
/* @keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
} */

/* @keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(100%);
    }
} */
</style>
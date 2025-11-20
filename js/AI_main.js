// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initDreamButton();
    initDrawingWall();
    initMessageWall();
    initStatistics();
    initParticleSystem(); // 初始化粒子系统
});

// 粒子系统功能
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    let particles = [];
    let particleCount = 20; // 初始粒子数量
    
    // 创建粒子
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机大小
        const sizes = ['particle-size-small', 'particle-size-medium', 'particle-size-large', 'particle-size-xlarge'];
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        particle.classList.add(sizeClass);
        
        // 随机位置
        const left = Math.random() * 100;
        const animationDuration = 6 + Math.random() * 4; // 6-10秒
        const animationDelay = Math.random() * 5; // 0-5秒延迟
        
        particle.style.left = left + '%';
        particle.style.animationDuration = animationDuration + 's';
        particle.style.animationDelay = animationDelay + 's';
        
        // 随机颜色
const colors = [
            'rgba(255, 255, 255, 0.4)',
            'rgba(102, 126, 234, 0.3)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(118, 75, 162, 0.3)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
        
        // 粒子动画结束后重新创建
        particle.addEventListener('animationend', function() {
            particle.remove();
            particles = particles.filter(p => p !== particle);
            createParticle();
        });
    }
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    // 根据参与人数调整粒子效果
    window.updateParticleEffects = function(onlineCount) {
        // 更新粒子数量
        const newParticleCount = Math.min(100, 20 + Math.floor(onlineCount / 5));
        
        // 调整粒子数量
        while (particles.length < newParticleCount) {
            createParticle();
        }
        while (particles.length > newParticleCount) {
            const particle = particles.pop();
            if (particle) particle.remove();
        }
        
        // 根据人数调整粒子密度和速度
        if (onlineCount >= 50) {
            particlesContainer.classList.add('particles-dense');
            particlesContainer.classList.remove('particles-very-dense', 'particles-extreme');
        } else if (onlineCount >= 30) {
            particlesContainer.classList.add('particles-very-dense');
            particlesContainer.classList.remove('particles-dense', 'particles-extreme');
        } else if (onlineCount >= 10) {
            particlesContainer.classList.add('particles-dense');
            particlesContainer.classList.remove('particles-very-dense', 'particles-extreme');
        } else {
            particlesContainer.classList.remove('particles-dense', 'particles-very-dense', 'particles-extreme');
        }
        
        // 根据人数调整背景效果
        updateBackgroundEffect(onlineCount);
    };
    
    // 更新背景效果
    function updateBackgroundEffect(count) {
        const body = document.body;
        body.classList.remove('level-1', 'level-2', 'level-3', 'level-4', 'level-5');
        
        if (count >= 80) {
            body.classList.add('level-5');
        } else if (count >= 60) {
            body.classList.add('level-4');
        } else if (count >= 40) {
            body.classList.add('level-3');
        } else if (count >= 20) {
            body.classList.add('level-2');
        } else {
            body.classList.add('level-1');
        }
    }
}

// 励志按钮功能
function initDreamButton() {
    const dreamButton = document.getElementById('dreamButton');
    const inspirationalQuotes = [
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
    ];
    
    dreamButton.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
        const randomQuote = inspirationalQuotes[randomIndex];
        showInspirationModal(randomQuote);
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// 涂鸦墙功能
function initDrawingWall() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const clearCanvas = document.getElementById('clearCanvas');
    const saveDrawing = document.getElementById('saveDrawing');
    const colorOptions = document.querySelectorAll('.color-option');
    const brushTypeBtns = document.querySelectorAll('.brush-type-btn');
    const backgroundOptions = document.querySelectorAll('.background-option');
    const resizeHandle = document.getElementById('resizeHandle');
    const sizeDisplay = document.getElementById('sizeDisplay');
    const canvasContainer = document.querySelector('.drawing-canvas-container');
    
    let isDrawing = false;
    let isResizing = false;
    let lastX = 0;
    let lastY = 0;
    let currentBrushType = 'normal';
    let currentBackground = 'white';
    let originalCanvasData = null;
    
    // 设置画布背景（保持不变）
    function setCanvasBackground(bgType) {
        currentBackground = bgType;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        switch(bgType) {
            case 'grid':
                drawGridBackground();
                break;
            case 'gradient':
                drawGradientBackground();
                break;
            case 'paper':
                drawPaperBackground();
                break;
            case 'sky':
                drawSkyBackground();
                break;
            default:
                // 纯白背景，什么都不做
                break;
        }
    }
    
    // 网格背景
    function drawGridBackground() {
        const gridSize = 20;
        const gridColor = '#f0f0f0';
        
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        
        // 绘制水平线
        for (let y = gridSize; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // 绘制垂直线
        for (let x = gridSize; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        // 添加中心点
        ctx.fillStyle = '#ddd';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 渐变背景
    function drawGradientBackground() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#e9ecef');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
// 添加一些装饰性圆点
        ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 10 + 5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 纸张纹理背景
    function drawPaperBackground() {
        // 基础纸张颜色
        ctx.fillStyle = '#fefefe';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加纸张纹理
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        for (let i = 0; i < 1000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2 + 0.5;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 添加轻微阴影
        const shadowGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.02)');
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
        
        ctx.fillStyle = shadowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
// 天空背景
    function drawSkyBackground() {
        // 天空渐变
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#E0F7FA');
        
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加云朵
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // 云朵1
        drawCloud(canvas.width * 0.2, canvas.height * 0.3, 40);
        // 云朵2
        drawCloud(canvas.width * 0.7, canvas.height * 0.2, 30);
        // 云朵3
        drawCloud(canvas.width * 0.4, canvas.height * 0.1, 35);
    }
    
    // 绘制云朵
    function drawCloud(x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x + size * 1.5, y, size * 0.9, 0, Math.PI * 2);
        ctx.arc(x + size * 0.8, y + size * 0.3, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 调整画布大小以适应容器
function resizeCanvasToContainer() {
        const container = canvasContainer;
        const maxWidth = container.clientWidth - 40;
        const ratio = canvas.width / canvas.height;
        
        if (maxWidth < canvas.width) {
            canvas.style.width = maxWidth + 'px';
            canvas.style.height = (maxWidth / ratio) + 'px';
        } else {
            canvas.style.width = canvas.width + 'px';
            canvas.style.height = canvas.height + 'px';
        }
        
        // 重新绘制背景
        setCanvasBackground(currentBackground);
        updateSizeDisplay();
    }
    
    // 更新尺寸显示
    function updateSizeDisplay() {
        sizeDisplay.textContent = `${canvas.width} × ${canvas.height}`;
    }
    
    // 调整画布尺寸
    function resizeCanvas(newWidth, newHeight) {
        // 保存当前画布内容
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
        
        // 设置新尺寸
        canvas.width = Math.max(400, Math.min(2000, newWidth));
        canvas.height = Math.max(300, Math.min(1500, newHeight));
        
        // 恢复画布内容
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0);
        
        // 重新绘制背景
        setCanvasBackground(currentBackground);
        updateSizeDisplay();
        resizeCanvasToContainer();
    }
    
    // 初始化画布
    setCanvasBackground('white');
    setBrushColor('#667eea');
    setBrushSize(5);
    setBrushType('normal');
    updateSizeDisplay();
    resizeCanvasToContainer();
    
    // 抓手控件事件处理
    resizeHandle.addEventListener('mousedown', startResizing);
    
    function startResizing(e) {
        e.preventDefault();
        isResizing = true;
        
        // 保存原始画布数据
        originalCanvasData = {
            width: canvas.width,
            height: canvas.height,
            x: e.clientX,
            y: e.clientY
        };
        
        // 添加视觉反馈
        canvasContainer.classList.add('canvas-resizing');
        document.body.style.cursor = 'nwse-resize';
        document.body.style.userSelect = 'none';
        
        // 添加事件监听
        document.addEventListener('mousemove', handleResizing);
        document.addEventListener('mouseup', stopResizing);
    }
    
    function handleResizing(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - originalCanvasData.x;
        const deltaY = e.clientY - originalCanvasData.y;
        
        // 计算新的画布尺寸（保持宽高比）
        const aspectRatio = originalCanvasData.width / originalCanvasData.height;
        let newWidth = originalCanvasData.width + deltaX;
        let newHeight = originalCanvasData.height + deltaY;
        
        // 保持宽高比
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newHeight = newWidth / aspectRatio;
        } else {
newWidth = newHeight * aspectRatio;
        }
        
        // 限制最小和最大尺寸
        newWidth = Math.max(400, Math.min(2000, newWidth));
        newHeight = Math.max(300, Math.min(1500, newHeight));
        
        // 实时预览尺寸
        sizeDisplay.textContent = `${Math.round(newWidth)} × ${Math.round(newHeight)}`;
        sizeDisplay.style.opacity = '1';
    }
    
    function stopResizing(e) {
        if (!isResizing) return;
        
        isResizing = false;
        
        const deltaX = e.clientX - originalCanvasData.x;
        const deltaY = e.clientY - originalCanvasData.y;
        
        // 计算最终尺寸
        const aspectRatio = originalCanvasData.width / originalCanvasData.height;
        let newWidth = originalCanvasData.width + deltaX;
        let newHeight = originalCanvasData.height + deltaY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newHeight = newWidth / aspectRatio;
        } else {
            newWidth = newHeight * aspectRatio;
        }
        
        // 应用新尺寸
        resizeCanvas(Math.round(newWidth), Math.round(newHeight));
        
        // 清理状态
        canvasContainer.classList.remove('canvas-resizing');
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        sizeDisplay.style.opacity = '';
        
        // 移除事件监听
        document.removeEventListener('mousemove', handleResizing);
        document.removeEventListener('mouseup', stopResizing);
    }
    
    // 触摸设备支持
    resizeHandle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startResizing(e.touches[0]);
    });
    
    // 窗口大小变化时重新调整画布
    window.addEventListener('resize', function() {
        resizeCanvasToContainer();
    });
    
    // 画笔设置（保持不变）
    function setBrushColor(color) {
        ctx.strokeStyle = color;
        colorPicker.value = color;
    }
    
    function setBrushSize(size) {
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        brushSizeValue.textContent = size + 'px';
    }
    
    function setBrushType(type) {
        currentBrushType = type;
        brushTypeBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-brush') === type) {
                btn.classList.add('active');
            }
        });
        
        if (type === 'soft') {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 0.6;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1.0;
        }
    }
    
    function setBackground(bgType) {
        setCanvasBackground(bgType);
        backgroundOptions.forEach(option => {
            option.classList.remove('active');
if (option.getAttribute('data-bg') === bgType) {
                option.classList.add('active');
            }
        });
    }
    
    // 绘画功能（保持不变）
    function startDrawing(e) {
        if (isResizing) return;
        isDrawing = true;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

    // 绘画功能
    function startDrawing(e) {
        if (isResizing) return;
        isDrawing = true;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        lastX = (e.clientX - rect.left) * scaleX;
        lastY = (e.clientY - rect.top) * scaleY;
    }
    
    function draw(e) {
        if (!isDrawing || isResizing) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        
        lastX = currentX;
        lastY = currentY;
        updateDrawingCount();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    



}

// 留言墙功能 - 使用真实后端API
function initMessageWall() {
    const messageForm = document.querySelector('.message-form');
    const userName = document.getElementById('userName');
    const messageContent = document.getElementById('messageContent');
    const charRemaining = document.getElementById('charRemaining');
    const submitMessage = document.getElementById('submitMessage');
    const messagesContainer = document.getElementById('messagesContainer');
    
    // 检查后端连接状态
    async function checkBackendStatus() {
        try {
            await youthApiClient.getMessages({ limit: 1 });
            return true;
        } catch (error) {
            console.warn('后端服务器未启动，使用本地存储模式');
            return false;
        }
    }
    
    // 字符计数
    messageContent.addEventListener('input', function() {
        const remaining = 200 - this.value.length;
        charRemaining.textContent = remaining;
        charRemaining.style.color = remaining < 20 ? '#e74c3c' : '#666';
    });
    
    // 提交留言
    submitMessage.addEventListener('click', async function() {
        const content = messageContent.value.trim();
        const name = userName.value.trim() || '匿名青年';
        
        if (!content) {
            showNotification('请输入留言内容！');
            return;
        }
        
        if (content.length > 200) {
            showNotification('留言内容不能超过200字！');
            return;
        }
        
        const isBackendOnline = await checkBackendStatus();
        
        try {
            let result;
            if (isBackendOnline) {
                // 使用真实后端API
                result = await YouthMessageAPI.createMessage({
                    author: name,
                    content: content
                });
            } else {
                // 后端离线，使用本地存储
                result = await createMessageLocal(name, content);
            }
            
            if (result.success) {
                addMessageToPage(result.data);
                messageContent.value = '';
                userName.value = '';
                charRemaining.textContent = '200';
                charRemaining.style.color = '#666';
                updateMessageCount();
                showNotification('留言发布成功！');
            } else {
                showNotification(result.error || '发布失败');
            }
        } catch (error) {
            console.error('发布留言失败:', error);
            showNotification('发布失败，请重试');
        }
    });
    
    // 本地存储备用方案
    async function createMessageLocal(author, content) {
        return new Promise((resolve) => {
            // 简单的本地存储实现
            let messages = JSON.parse(localStorage.getItem('localMessages') || '[]');
            const newMessage = {
                id: 'local_' + Date.now(),
                author,
                content,
                timestamp: new Date().toISOString(),
                likes: 0,
                replies: []
            };
            
            messages.unshift(newMessage);
            localStorage.setItem('localMessages', JSON.stringify(messages.slice(0, 50)));
            
            resolve({ success: true, data: newMessage });
        });
    }
    
    // 加载留言
    async function loadMessages() {
        const isBackendOnline = await checkBackendStatus();
        
        try {
            let result;
            if (isBackendOnline) {
                result = await YouthMessageAPI.getMessages({ limit: 50 });
            } else {
                result = await loadMessagesLocal();
            }
            
            if (result.success) {
                messagesContainer.innerHTML = '';
                
                if (result.data.messages.length === 0) {
                    messagesContainer.innerHTML = '<div class="no-messages">暂无留言，快来留下你的青春寄语吧！</div>';
                    return;
                }
                
                result.data.messages.forEach(msg => {
                    addMessageToPage(msg);
                });
                
                messageCount.textContent = result.data.pagination?.total || result.data.messages.length;
            }
        } catch (error) {
            console.error('加载留言失败:', error);
            messagesContainer.innerHTML = '<div class="no-messages">加载留言失败</div>';
        }
    }
    
    // 本地加载备用方案
    async function loadMessagesLocal() {
        return new Promise((resolve) => {
            const messages = JSON.parse(localStorage.getItem('localMessages') || '[]');
            resolve({
                success: true,
                data: {
                    messages: messages,
                    pagination: { total: messages.length }
                }
            });
        });
    }
    
    // 留言显示函数（保持不变）
    function addMessageToPage(messageData) {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.setAttribute('data-message-id', messageData.id);
        
        const localTime = new Date(messageData.timestamp).toLocaleString();
        
        messageItem.innerHTML = `
            <div class="message-header">
                <span class="message-author">${escapeHtml(messageData.author)}</span>
                <span class="message-time" title="${messageData.timestamp}">${localTime}</span>
                <span class="message-id">#${messageData.id.substr(4, 8)}</span>
            </div>
            <div class="message-content">${escapeHtml(messageData.content)}</div>
            <div class="message-footer">
                <button class="like-btn" onclick="likeMessageAPI('${messageData.id}')">
                    <span class="like-icon">❤️</span>
                    <span class="like-count">${messageData.likes}</span>
                </button>
                <button class="reply-btn" onclick="showReplyFormAPI('${messageData.id}')">回复</button>
                <button class="export-btn" onclick="exportMessageAPI('${messageData.id}')">导出</button>
            </div>
            ${messageData.replies.length > 0 ? `
            <div class="replies-container">
                ${messageData.replies.map(reply => `
                    <div class="reply-item">
                        <span class="reply-author">${escapeHtml(reply.author)}</span>
                        <span class="reply-content">${escapeHtml(reply.content)}</span>
                        <span class="reply-time">${new Date(reply.timestamp).toLocaleTimeString()}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
        `;
        
        messagesContainer.appendChild(messageItem);
    }
    
    // 全局API函数
    window.likeMessageAPI = async function(messageId) {
        try {
            const result = await YouthMessageAPI.likeMessage(messageId);
            if (result.success) {
                const likeCount = document.querySelector(`[data-message-id="${messageId}"] .like-count`);
                if (likeCount) {
                    likeCount.textContent = result.data.likes;
                }
                showNotification('点赞成功！');
            } else {
                showNotification(result.error || '点赞失败');
            }
        } catch (error) {
            showNotification('网络错误');
        }
    };
    
    window.showReplyFormAPI = async function(messageId) {
        const reply = prompt('请输入回复内容：');
        if (reply && reply.trim()) {
            try {
                const result = await YouthMessageAPI.replyToMessage(messageId, {
                    author: '我',
                    content: reply.trim()
                });
                
                if (result.success) {
                    showNotification('回复成功！');
                    // 重新加载留言列表
                    loadMessages();
                } else {
                    showNotification(result.error || '回复失败');
                }
            } catch (error) {
                showNotification('网络错误');
            }
        }
    };
    
    window.exportMessageAPI = async function(messageId) {
        try {
            const result = await YouthMessageAPI.exportData();
            if (result.success) {
                const message = result.data.messages.find(msg => msg.id === messageId);
                if (message) {
                    const jsonStr = JSON.stringify(message, null, 2);
                    const blob = new Blob([jsonStr], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `message_${messageId}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showNotification('留言已导出为JSON文件！');
                }
            }
        } catch (error) {
            showNotification('导出失败');
        }
    };
    
    window.exportAllMessagesAPI = async function() {
        try {
            const result = await YouthMessageAPI.exportData();
            if (result.success) {
                const jsonStr = JSON.stringify(result.data, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `youth_messages_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
                showNotification('所有留言数据已导出为JSON文件！');
            }
        } catch (error) {
            showNotification('导出失败');
        }
    };
    
    // 转义HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 页面加载时读取留言
    loadMessages();
}

// 统计功能
function initStatistics() {
    const onlineCount = document.getElementById('onlineCount');
    const drawingCount = document.getElementById('drawingCount');
    const messageCount = document.getElementById('messageCount');
    
    // 模拟在线人数（实际项目中应该使用WebSocket）
    function updateOnlineCount() {
        const baseCount = Math.floor(Math.random() * 50) + 20; // 20-70人
        onlineCount.textContent = baseCount;
        
        // 更新粒子效果
        if (window.updateParticleEffects) {
            window.updateParticleEffects(baseCount);
        }
        
        // 每30秒更新一次
        setInterval(() => {
            const change = Math.floor(Math.random() * 5) - 2; // -2到+2的变化
            const current = parseInt(onlineCount.textContent);
            const newCount = Math.max(10, current + change);
            onlineCount.textContent = newCount;
            
            // 更新粒子效果
            if (window.updateParticleEffects) {
                window.updateParticleEffects(newCount);
            }
        }, 30000);
    }
    
    function updateDrawingCount() {
        let count = parseInt(drawingCount.textContent);
        drawingCount.textContent = count + 1;
        
        // 保存到本地存储
        localStorage.setItem('drawingCount', drawingCount.textContent);
        
        // 更新粒子效果（涂鸦数量也会影响视觉效果）
        updateVisualEffects();
    }
    
    function updateMessageCount() {
        let count = parseInt(messageCount.textContent);
        messageCount.textContent = count + 1;
        
        // 保存到本地存储
        localStorage.setItem('messageCount', messageCount.textContent);
        
        // 更新粒子效果（留言数量也会影响视觉效果）
        updateVisualEffects();
    }
    
    // 更新视觉效果
    function updateVisualEffects() {
        const online = parseInt(onlineCount.textContent);
        const drawing = parseInt(drawingCount.textContent);
        const message = parseInt(messageCount.textContent);
        
        // 综合参与度计算（在线人数权重最高）
        const participationLevel = online + Math.floor(drawing / 10) + Math.floor(message / 5);
        
        if (window.updateParticleEffects) {
            window.updateParticleEffects(participationLevel);
        }
    }
    
    // 从本地存储加载统计数据
    function loadStatistics() {
        const savedDrawingCount = localStorage.getItem('drawingCount');
        const savedMessageCount = localStorage.getItem('messageCount');
        
        if (savedDrawingCount) {
            drawingCount.textContent = savedDrawingCount;
        }
        
        if (savedMessageCount) {
            messageCount.textContent = savedMessageCount;
        } else {
            // 初始化留言数量为当前留言数
            const messages = JSON.parse(localStorage.getItem('youthMessages') || '[]');
            messageCount.textContent = messages.length;
        }
        
        // 初始化粒子效果
        const initialCount = parseInt(onlineCount.textContent);
        if (window.updateParticleEffects) {
            window.updateParticleEffects(initialCount);
        }
    }
    
    updateOnlineCount();
    loadStatistics();
}

// 工具函数
function showInspirationModal(quote) {
    const modal = document.createElement('div');
    modal.style.cssText = `
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
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    `;
    
    const quoteText = document.createElement('p');
    quoteText.textContent = quote;
    quoteText.style.cssText = `
        font-size: 1.3rem;
        color: #667eea;
        margin-bottom: 20px;
        line-height: 1.6;
        font-weight: 500;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = '继续追梦';
    closeButton.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
    `;
    
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modalContent.appendChild(quoteText);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
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
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加CSS动画
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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
        
        @keyframes slideInRight {
            from { 
                opacity: 0;
                transform: translateX(100%);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from { 
                opacity: 1;
                transform: translateX(0);
            }
            to { 
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化CSS动画
addCSSAnimations();
}
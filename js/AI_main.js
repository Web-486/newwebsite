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
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // 设置画布背景
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 调整画布大小以适应容器
    function resizeCanvas() {
        const container = canvas.parentElement;
        const maxWidth = container.clientWidth - 40; // 减去padding
        const ratio = canvas.width / canvas.height;
        
        if (maxWidth < canvas.width) {
            canvas.style.width = maxWidth + 'px';
            canvas.style.height = (maxWidth / ratio) + 'px';
        } else {
            canvas.style.width = canvas.width + 'px';
            canvas.style.height = canvas.height + 'px';
        }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 画笔设置
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
    
    // 初始化画笔
    setBrushColor('#667eea');
    setBrushSize(5);
    
    // 事件监听
    colorPicker.addEventListener('input', function() {
        setBrushColor(this.value);
    });
    
    brushSize.addEventListener('input', function() {
        setBrushSize(parseInt(this.value));
    });
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            setBrushColor(color);
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 绘画功能
    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        lastX = (e.clientX - rect.left) * scaleX;
        lastY = (e.clientY - rect.top) * scaleY;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
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
        
        // 更新涂鸦数量
        updateDrawingCount();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    // 触摸设备支持
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });
    
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        draw(e.touches[0]);
    });
    
    canvas.addEventListener('touchend', stopDrawing);
    
    // 清空画布
    clearCanvas.addEventListener('click', function() {
        if (confirm('确定要清空画布吗？')) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });
    
    // 保存涂鸦
    saveDrawing.addEventListener('click', function() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = '青春涂鸦-' + new Date().toLocaleDateString() + '.png';
        link.href = dataURL;
        link.click();
        
        showNotification('涂鸦已保存！');
    });
}

// 留言墙功能
function initMessageWall() {
    const messageForm = document.querySelector('.message-form');
    const userName = document.getElementById('userName');
    const messageContent = document.getElementById('messageContent');
    const charRemaining = document.getElementById('charRemaining');
    const submitMessage = document.getElementById('submitMessage');
    const messagesContainer = document.getElementById('messagesContainer');
    
    // 字符计数
    messageContent.addEventListener('input', function() {
        const remaining = 200 - this.value.length;
        charRemaining.textContent = remaining;
        charRemaining.style.color = remaining < 20 ? '#e74c3c' : '#666';
    });
    
    // 提交留言
    submitMessage.addEventListener('click', function() {
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
        
        addMessage(name, content);
        
        // 清空表单
        messageContent.value = '';
        userName.value = '';
        charRemaining.textContent = '200';
        charRemaining.style.color = '#666';
        
        // 更新留言数量
        updateMessageCount();
        
        showNotification('留言发布成功！');
    });
    
    // 添加留言到页面
    function addMessage(name, content) {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        const timestamp = new Date().toLocaleString();
        
        messageItem.innerHTML = `
            <div class="message-header">
                <span class="message-author">${escapeHtml(name)}</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-content">${escapeHtml(content)}</div>
        `;
        
        // 移除"暂无留言"提示
        const noMessages = messagesContainer.querySelector('.no-messages');
        if (noMessages) {
            noMessages.remove();
        }
        
        // 添加到顶部
        messagesContainer.insertBefore(messageItem, messagesContainer.firstChild);
        
        // 保存到本地存储
        saveMessageToLocal({ name, content, timestamp });
    }
    
    // 转义HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // 本地存储功能
    function saveMessageToLocal(message) {
        let messages = JSON.parse(localStorage.getItem('youthMessages') || '[]');
        messages.unshift(message);
        
        // 只保留最近50条留言
        if (messages.length > 50) {
            messages = messages.slice(0, 50);
        }
        
        localStorage.setItem('youthMessages', JSON.stringify(messages));
    }
    
    function loadMessagesFromLocal() {
        const messages = JSON.parse(localStorage.getItem('youthMessages') || '[]');
        messages.forEach(msg => {
            addMessage(msg.name, msg.content);
        });
    }
    
    // 页面加载时读取留言
    loadMessagesFromLocal();
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
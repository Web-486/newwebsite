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
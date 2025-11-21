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
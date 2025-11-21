// 涂鸦墙功能
// 调整画布大小以适应容器
function resizeCanvas() {
    const canvas = document.getElementById('drawingCanvas');
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
    
    // 画布大小调节功能
    initCanvasResize();
    
    // 画布背景选择功能
    initCanvasBackground();
}

// 画布大小调节功能
function initCanvasResize() {
    const canvas = document.getElementById('drawingCanvas');
    const resizeHandle = document.getElementById('canvasResizeHandle');
    const container = canvas.parentElement;
    
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    
    // 开始调节
    resizeHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(canvas.width);
        startHeight = parseInt(canvas.height);
        
        // 阻止事件冒泡
        e.stopPropagation();
        e.preventDefault();
    });
    
    // 调节过程中
    document.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // 计算新的宽度和高度（保持比例）
        const newWidth = Math.max(400, startWidth + deltaX);
        const newHeight = Math.max(200, startHeight + deltaY);
        
        // 更新画布尺寸
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // 重新设置画布背景
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 重新调整画布显示大小
        resizeCanvas();
    });
    
    // 结束调节
    document.addEventListener('mouseup', function() {
        isResizing = false;
        
        // 保存画布尺寸到本地存储
        localStorage.setItem('canvasWidth', canvas.width);
        localStorage.setItem('canvasHeight', canvas.height);
    });
    
    // 触摸设备支持
    resizeHandle.addEventListener('touchstart', function(e) {
        isResizing = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startWidth = parseInt(canvas.width);
        startHeight = parseInt(canvas.height);
        
        e.stopPropagation();
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isResizing) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        const newWidth = Math.max(400, startWidth + deltaX);
        const newHeight = Math.max(200, startHeight + deltaY);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        resizeCanvas();
    });
    
    document.addEventListener('touchend', function() {
        isResizing = false;
        localStorage.setItem('canvasWidth', canvas.width);
        localStorage.setItem('canvasHeight', canvas.height);
    });
    
    // 页面加载时恢复保存的画布尺寸
    function loadCanvasSize() {
        const savedWidth = localStorage.getItem('canvasWidth');
        const savedHeight = localStorage.getItem('canvasHeight');
        
        if (savedWidth && savedHeight) {
            canvas.width = parseInt(savedWidth);
            canvas.height = parseInt(savedHeight);
            
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            resizeCanvas();
        }
    }
    
    // 页面加载时调用
    loadCanvasSize();
}

// 画布背景选择功能
function initCanvasBackground() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const backgroundOptions = document.querySelectorAll('.background-option');
    
    // 背景样式定义
    const backgroundStyles = {
        'white': function(ctx, width, height) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
        },
        'grid': function(ctx, width, height) {
            // 绘制网格背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            
            // 绘制垂直线
            for (let x = 0; x <= width; x += 20) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            
            // 绘制水平线
            for (let y = 0; y <= height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        },
        'dots': function(ctx, width, height) {
            // 绘制点状背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            
            ctx.fillStyle = '#e0e0e0';
            
            for (let x = 10; x < width; x += 20) {
                for (let y = 10; y < height; y += 20) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        },
        'gradient': function(ctx, width, height) {
            // 绘制渐变背景
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#f5f7fa');
            gradient.addColorStop(1, '#c3cfe2');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        },
        'paper': function(ctx, width, height) {
            // 绘制纸张纹理背景
            ctx.fillStyle = '#f5f5dc';
            ctx.fillRect(0, 0, width, height);
            
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            
            // 绘制横线（类似笔记本纸张）
            for (let y = 20; y < height; y += 20) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        }
    };
    
    // 设置画布背景
    function setCanvasBackground(backgroundType, showNotificationFlag = true) {
        const width = canvas.width;
        const height = canvas.height;
        
        if (backgroundStyles[backgroundType]) {
            backgroundStyles[backgroundType](ctx, width, height);
            
            // 保存到本地存储
            localStorage.setItem('canvasBackground', backgroundType);
            
            // 只在需要时显示通知
            if (showNotificationFlag) {
                showNotification(`已切换到${getBackgroundName(backgroundType)}背景`);
            }
        }
    }
    
    // 获取背景名称
    function getBackgroundName(backgroundType) {
        const names = {
            'white': '纯白',
            'grid': '网格',
            'dots': '点状',
            'gradient': '渐变',
            'paper': '纸张'
        };
        return names[backgroundType] || backgroundType;
    }
    
    // 背景选择事件
    backgroundOptions.forEach(option => {
        option.addEventListener('click', function() {
            const backgroundType = this.getAttribute('data-background');
            
            // 更新激活状态
            backgroundOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // 设置背景（显示通知）
            setCanvasBackground(backgroundType, true);
        });
    });
    
    // 页面加载时恢复保存的背景
    function loadCanvasBackground() {
        const savedBackground = localStorage.getItem('canvasBackground') || 'white';
        
        // 设置对应的选项为激活状态
        backgroundOptions.forEach(option => {
            if (option.getAttribute('data-background') === savedBackground) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // 应用背景（不显示通知）
        setCanvasBackground(savedBackground, false);
    }
    
    // 页面加载时调用
    loadCanvasBackground();
    
    // 监听画布大小变化，重新绘制背景
    // 由于canvas没有resize事件，我们通过其他方式处理
    
    // 保存原始resizeCanvas函数引用
    const originalResizeCanvas = resizeCanvas;
    
    // 重写resizeCanvas函数，在调整大小时重新绘制背景
    resizeCanvas = function(newWidth, newHeight) {
        originalResizeCanvas(newWidth, newHeight);
        
        // 重新绘制背景（不显示通知）
        const currentBackground = localStorage.getItem('canvasBackground') || 'white';
        setCanvasBackground(currentBackground, false);
    };
}
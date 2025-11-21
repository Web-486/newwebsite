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
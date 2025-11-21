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
// 木鱼音效
const woodfishSound = new Audio('https://cdn.jsdelivr.net/gh/your-repo/woodfish-sound.mp3');

// 祝福语数组
const blessings = [
    "福寿安康",
    "心如莲花开",
    "吉祥如意",
    "平安喜乐",
    "善果随行"
];

let hitCount = 0;

// 滚动到木鱼区
function scrollToWoodfish() {
    document.querySelector('.woodfish-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// 木鱼点击效果
document.getElementById('woodfish').addEventListener('click', function() {
    // 播放音效
    woodfishSound.currentTime = 0;
    woodfishSound.play();

    // 木鱼动画
    this.style.transform = 'scale(0.95)';
    setTimeout(() => this.style.transform = 'scale(1)', 100);

    // 显示随机祝福语
    const blessing = document.getElementById('blessingText');
    blessing.textContent = blessings[Math.floor(Math.random() * blessings.length)];
    blessing.style.opacity = 1;
    blessing.classList.add('animate__animated', 'animate__fadeInUp');
    
    // 创建金色波纹
    createRipple(event);

    // 计数器
    hitCount++;
    if(hitCount === 10) {
        showSpecialBlessing();
        hitCount = 0;
    }

    setTimeout(() => {
        blessing.style.opacity = 0;
        blessing.classList.remove('animate__animated', 'animate__fadeInUp');
    }, 2000);
});

// 创建波纹效果
function createRipple(event) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

// 记录祈愿
function recordWish() {
    const wishInput = document.getElementById('wishInput');
    if(!wishInput.value.trim()) return;

    // 显示记录成功提示
    const successMsg = document.createElement('div');
    successMsg.textContent = '愿望已记录';
    successMsg.classList.add('success-msg', 'animate__animated', 'animate__fadeIn');
    document.querySelector('.wish-container').appendChild(successMsg);

    setTimeout(() => {
        successMsg.remove();
        wishInput.value = '';
    }, 2000);
}

// 显示特殊祝福
function showSpecialBlessing() {
    const special = document.createElement('div');
    special.textContent = '恭喜解锁一段禅意祝福：愿您心似莲花般纯净';
    special.classList.add('special-blessing', 'animate__animated', 'animate__fadeIn');
    document.querySelector('.woodfish-section').appendChild(special);

    setTimeout(() => special.remove(), 3000);
}

// 生成分享卡片
function generateShareCard() {
    const wishText = document.getElementById('wishInput').value;
    const card = document.querySelector('.wish-card');
    card.querySelector('.wish-text').textContent = wishText || '愿世界和平';
    
    // 这里可以添加更多卡片生成逻辑
    html2canvas(card).then(canvas => {
        // 处理canvas，生成图片等
    });
}

// 添加触摸事件支持
document.getElementById('woodfish').addEventListener('touchstart', function(e) {
    e.preventDefault(); // 防止双击缩放
    handleWoodfishClick(e);
}, false);

// 优化音频加载
document.addEventListener('DOMContentLoaded', function() {
    // 预加载音频
    woodfishSound.load();
    // 添加移动端唤醒音频上下文
    document.addEventListener('touchstart', function() {
        woodfishSound.play().then(() => {
            woodfishSound.pause();
            woodfishSound.currentTime = 0;
        }).catch(() => {});
    }, { once: true });
}); 
// 木鱼音效
let woodfishSound;
let canPlayAudio = true; // 标记是否可以播放音频

// 预加载音频
function initAudio() {
    try {
        // 创建音频上下文
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // 使用多个备选音源
        const audioSources = [
            'assets/sounds/muyu.mp3',
            'https://gw.alipayobjects.com/os/sage/1638958990420/muyu.mp3',
            'https://prod.wave.webaverse.com/assets/sounds/woodblock.mp3'
        ];

        // 尝试加载第一个可用的音源
        async function loadAudio() {
            for (const source of audioSources) {
                try {
                    woodfishSound = new Audio(source);
                    await woodfishSound.play();
                    woodfishSound.pause();
                    woodfishSound.currentTime = 0;
                    console.log('音频加载成功:', source);
                    return true;
                } catch (error) {
                    console.log('尝试加载音频失败:', source);
                    continue;
                }
            }
            return false;
        }

        // 初始化音频
        loadAudio().then(success => {
            if (!success) {
                console.log('所有音频源都加载失败，切换到无声模式');
                canPlayAudio = false;
            }
        });

        // 添加用户交互时初始化音频的处理
        document.addEventListener('click', function initOnClick() {
            audioContext.resume();
            document.removeEventListener('click', initOnClick);
        }, { once: true });

    } catch (error) {
        console.log('音频初始化失败，切换到无声模式:', error);
        canPlayAudio = false;
    }
}

// 祝福语数组
const blessings = [
    "福寿安康",
    "心如莲花开",
    "吉祥如意",
    "平安喜乐",
    "善果随行"
];

let hitCount = 0;
let totalHits = parseInt(localStorage.getItem('totalHits') || '0');

// 更新计数器显示
function updateCounter() {
    const counter = document.getElementById('hitCounter');
    if (counter) {
        totalHits++;
        counter.textContent = totalHits;
        localStorage.setItem('totalHits', totalHits);
    }
}

// 处理木鱼点击
function handleWoodfishClick(e) {
    e.preventDefault();
    const woodfish = document.getElementById('woodfish');
    
    // 添加敲击动画
    woodfish.classList.add('knocking');
    setTimeout(() => {
        woodfish.classList.remove('knocking');
    }, 300);

    // 播放音效（如果可用）
    if (canPlayAudio && woodfishSound) {
        try {
            // 确保音频可以重复播放
            woodfishSound.currentTime = 0;
            let playPromise = woodfishSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('音频播放失败，切换到无声模式:', error);
                    canPlayAudio = false;
                });
            }
        } catch (error) {
            console.log('音频播放出错，切换到无声模式:', error);
            canPlayAudio = false;
        }
    }

    showBlessing();
    updateCounter();
    createRipple(e);
}

// 记录祈愿
function recordWish() {
    const wishInput = document.getElementById('wishInput');
    const wish = wishInput.value.trim();
    
    if (!wish) return;

    // 获取或创建愿望文字显示区域
    let wishDisplay = document.querySelector('.wish-text-display');
    if (!wishDisplay) {
        wishDisplay = document.createElement('div');
        wishDisplay.className = 'wish-text-display';
        const woodfishContainer = document.querySelector('.woodfish-container');
        woodfishContainer.insertBefore(wishDisplay, woodfishContainer.firstChild);
    }

    // 显示愿望文字
    wishDisplay.textContent = wish;
    wishDisplay.classList.add('show');

    // 保存愿望
    const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    wishes.push({
        text: wish,
        date: new Date().toLocaleString(),
        count: 0
    });
    localStorage.setItem('wishes', JSON.stringify(wishes));

    // 清空输入框
    wishInput.value = '';
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化音频
    initAudio();
    
    const woodfish = document.getElementById('woodfish');
    if (woodfish) {
        woodfish.addEventListener('click', handleWoodfishClick);
        woodfish.addEventListener('touchstart', handleWoodfishClick);
    }
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

// 显示祝福语
function showBlessing() {
    const blessing = document.getElementById('blessingText');
    if (blessing) {
        blessing.textContent = blessings[Math.floor(Math.random() * blessings.length)];
        blessing.style.opacity = 1;
        blessing.classList.add('animate__animated', 'animate__fadeInUp');
        
        setTimeout(() => {
            blessing.style.opacity = 0;
            blessing.classList.remove('animate__animated', 'animate__fadeInUp');
        }, 2000);
    }
}
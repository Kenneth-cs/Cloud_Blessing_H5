// 祈愿记录相关功能
function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    const wishesList = document.getElementById('wishesList');
    wishesList.innerHTML = wishes.map(wish => `
        <div class="wish-item">
            <p class="wish-text">${wish.text}</p>
            <span class="wish-date">${wish.date}</span>
        </div>
    `).join('');
}

function generateShareCard() {
    // 分享卡片生成逻辑
}

// ... 其他祈愿相关函数 
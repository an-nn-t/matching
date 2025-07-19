// グローバル変数
let currentScreen = 'start-screen';
let selectedPurpose = '';
let userProfile = {};
let currentCardIndex = 0;
let likeCount = 0;
let matchedPartner = null;
let isTyping = false;

// ダミーデータ
const profiles = [
    {
        name: "鈴木 恵子",
        age: 72,
        avatar: "恵",
        compatibility: 85,
        tags: ["#俳句", "#御朱印集め", "#散歩", "#お茶"],
        intro: "夫と死別し、日中話す相手が少なくなりました。散歩がてら、一緒にお茶でもできる方と出会えたら嬉しいです。",
        hobbies: ["俳句", "御朱印集め"],
        image: "🌸"
    },
    {
        name: "高橋 健一",
        age: 45,
        avatar: "健",
        compatibility: 78,
        tags: ["#料理", "#子供好き", "#映画鑑賞", "#旅行"],
        intro: "仕事が落ち着き、もう一度パートナーと穏やかな家庭を築きたいと思っています。休日は娘と料理をするのが楽しみです。",
        hobbies: ["料理", "映画鑑賞"],
        image: "👨‍🍳"
    },
    {
        name: "Maria",
        age: 25,
        avatar: "M",
        compatibility: 92,
        tags: ["#アニメ", "#旅行", "#語学交換", "#文化交流"],
        intro: "日本の文化が大好きです！一緒に話しながら日本語を教えてくれる友達を探しています。Let's be friends!",
        hobbies: ["アニメ", "旅行"],
        image: "🌍"
    },
    {
        name: "田中 明美",
        age: 38,
        avatar: "明",
        compatibility: 83,
        tags: ["#カフェ巡り", "#読書", "#音楽", "#アート"],
        intro: "新しい街に引っ越してきたばかりです。一緒にカフェ巡りを楽しんでくれる友達を探しています。",
        hobbies: ["カフェ巡り", "読書"],
        image: "☕"
    },
    {
        name: "佐藤 雄太",
        age: 29,
        avatar: "雄",
        compatibility: 76,
        tags: ["#スポーツ", "#アウトドア", "#写真", "#バイク"],
        intro: "アクティブに過ごすのが好きです。一緒にアウトドアを楽しめる仲間を探しています。",
        hobbies: ["スポーツ", "アウトドア"],
        image: "🏃‍♂️"
    }
];

// 画面遷移
function goToScreen(screenId) {
    const currentScreenEl = document.getElementById(currentScreen);
    const nextScreenEl = document.getElementById(screenId);
    
    currentScreenEl.classList.remove('active');
    currentScreenEl.classList.add('prev');
    
    setTimeout(() => {
        nextScreenEl.classList.add('active');
        currentScreen = screenId;
        
        // 画面固有の初期化処理
        if (screenId === 'main-screen') {
            initializeMainScreen();
        } else if (screenId === 'analysis-screen') {
            setTimeout(() => {
                startAnalysisAnimation();
            }, 500);
        }
    }, 250);
}

// 目的選択
function selectPurpose(element, purpose) {
    document.querySelectorAll('.purpose-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedPurpose = purpose;
    
    setTimeout(() => {
        goToScreen('profile-screen');
    }, 800);
}

// タグ選択
function toggleTag(element) {
    element.classList.toggle('selected');
    validateForm();
}

// フォーム検証
function validateForm() {
    const nickname = document.getElementById('nickname').value.trim();
    const age = document.getElementById('age').value;
    const selectedTags = document.querySelectorAll('.tag.selected');
    const analyzeBtn = document.getElementById('analyze-btn');
    
    if (nickname && age && selectedTags.length > 0) {
        analyzeBtn.classList.add('active');
    } else {
        analyzeBtn.classList.remove('active');
    }
}

// フォーム要素にイベントリスナーを追加
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nickname').addEventListener('input', validateForm);
    document.getElementById('age').addEventListener('change', validateForm);
});

// AI分析開始
function startAnalysis() {
    const nickname = document.getElementById('nickname').value.trim();
    const age = document.getElementById('age').value;
    const selectedTags = Array.from(document.querySelectorAll('.tag.selected')).map(tag => tag.textContent);
    
    userProfile = {
        nickname: nickname,
        age: age,
        tags: selectedTags,
        avatar: nickname.charAt(0).toUpperCase()
    };
    
    goToScreen('analysis-screen');
}

// 分析アニメーション
function startAnalysisAnimation() {
    const animationContainer = document.getElementById('analysis-animation');
    const analysisText = document.getElementById('analysis-text');
    const radarChart = document.getElementById('radar-chart');
    
    // 粒子生成
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(animationContainer);
        }, i * 100);
    }
    
    // テキスト変更
    const texts = [
        "あなたに合いそうな人を探しています...",
        "相性が良さそうな人を準備しています...",
        "AIによる詳細分析を実行中...",
        "最適なマッチングを計算しています..."
    ];
    
    let textIndex = 0;
    const textInterval = setInterval(() => {
        if (textIndex < texts.length) {
            analysisText.textContent = texts[textIndex];
            textIndex++;
        } else {
            clearInterval(textInterval);
        }
    }, 1000);
    
    // レーダーチャート表示
    setTimeout(() => {
        radarChart.classList.add('show');
        analysisText.textContent = "分析が完了しました。あなたにぴったりの方を探しに行きましょう！";
        
        setTimeout(() => {
            goToScreen('main-screen');
        }, 2000);
    }, 4000);
}

// 粒子生成
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 180 + 'px';
    particle.style.top = Math.random() * 180 + 'px';
    particle.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// メイン画面初期化
function initializeMainScreen() {
    document.getElementById('user-avatar').textContent = userProfile.avatar;
    document.getElementById('user-name').textContent = userProfile.nickname;
    
    renderCards();
}

// カード生成
function renderCards() {
    const cardStack = document.getElementById('card-stack');
    cardStack.innerHTML = '';
    
    for (let i = 0; i < Math.min(3, profiles.length - currentCardIndex); i++) {
        const profile = profiles[currentCardIndex + i];
        const card = createProfileCard(profile, i);
        cardStack.appendChild(card);
    }
}

// プロフィールカード作成
function createProfileCard(profile, index) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.style.zIndex = 3 - index;
    card.style.transform = `scale(${1 - index * 0.05}) translateY(${index * 10}px)`;
    
    card.innerHTML = `
        <div class="card-image">${profile.image}</div>
        <div class="card-content">
            <div class="card-name">${profile.name}</div>
            <div class="card-age">${profile.age}歳</div>
            <div class="card-compatibility">AI相性 ${profile.compatibility}%</div>
            <div class="card-tags">
                ${profile.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// カード拒否
function rejectCard() {
    animateCard('left');
    nextCard();
}

// カードいいね
function likeCard() {
    animateCard('right');
    createHeartAnimation();
    likeCount++;
    
    // 3回目のいいねでマッチング
    if (likeCount === 3) {
        matchedPartner = profiles[currentCardIndex];
        setTimeout(() => {
            goToMatch();
        }, 1000);
    } else {
        nextCard();
    }
}

// カードアニメーション
function animateCard(direction) {
    const topCard = document.querySelector('.profile-card');
    if (topCard) {
        const translateX = direction === 'left' ? '-100%' : '100%';
        topCard.style.transform = `translateX(${translateX}) rotate(${direction === 'left' ? '-' : ''}30deg)`;
        topCard.style.opacity = '0';
        
        setTimeout(() => {
            topCard.remove();
        }, 300);
    }
}

// 次のカード
function nextCard() {
    currentCardIndex++;
    setTimeout(() => {
        renderCards();
    }, 300);
}

// ハートアニメーション
function createHeartAnimation() {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = '♥';
    heart.style.left = '50%';
    heart.style.top = '50%';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// マッチング画面へ
function goToMatch() {
    document.getElementById('match-text').textContent = `${matchedPartner.name}とマッチしました！`;
    document.getElementById('partner-match-avatar').textContent = matchedPartner.avatar;
    
    // 紙吹雪アニメーション
    createConfetti();
    
    goToScreen('match-screen');
}

// 紙吹雪生成
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#ff6b6b', '#4a90e2', '#ff8e53', '#7b68ee'][Math.floor(Math.random() * 4)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// チャット画面へ
function goToChat(useAI) {
    document.getElementById('chat-header').textContent = `${matchedPartner.name}とのチャット`;
    
    if (useAI) {
        // AI提案の内容を動的に更新
        const userHobby = userProfile.tags[0] || '#散歩';
        const partnerHobby = matchedPartner.hobbies[0] || '俳句';
        
        document.getElementById('suggestion-hobby').textContent = partnerHobby;
        document.getElementById('suggestion-user-hobby').textContent = userHobby.replace('#', '');
        document.getElementById('suggestion-user-name').textContent = userProfile.nickname;
    }
    
    goToScreen('chat-screen');
}

// AI提案表示
function showAISuggestions() {
    const suggestions = document.getElementById('ai-suggestions');
    suggestions.classList.toggle('hide');
    suggestions.classList.toggle('show');
}

// AI提案選択
function selectSuggestion(element, index) {
    const messageInput = document.getElementById('message-input');
    const suggestionText = element.textContent;
    
    // タイピングアニメーション
    messageInput.value = '';
    messageInput.classList.add('typing-animation');
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
        if (charIndex < suggestionText.length) {
            messageInput.value += suggestionText[charIndex];
            charIndex++;
        } else {
            clearInterval(typingInterval);
            messageInput.classList.remove('typing-animation');
        }
    }, 50);
    
    // 提案を非表示
    document.getElementById('ai-suggestions').classList.add('hide');
    document.getElementById('ai-suggestions').classList.remove('show');
}

// メッセージ送信
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        
        // 自分のメッセージを追加
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `<div class="message-bubble">${message}</div>`;
        chatMessages.appendChild(messageElement);
        
        // 入力欄をクリア
        messageInput.value = '';
        
        // 相手からの返信をシミュレート
        setTimeout(() => {
            const responses = [
                "ありがとうございます！とても嬉しいです。",
                "こちらこそ、よろしくお願いします。",
                "お話しできて楽しいです。また明日もチャットしましょう！",
                "素敵なメッセージをありがとうございます。"
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const responseElement = document.createElement('div');
            responseElement.className = 'message received';
            responseElement.innerHTML = `<div class="message-bubble">${randomResponse}</div>`;
            chatMessages.appendChild(responseElement);
            
            // スクロールを最下部に
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // スクロールを最下部に
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Enterキーでメッセージ送信
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// スワイプ機能（タッチデバイス用）
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let isSwipe = false;

document.addEventListener('touchstart', function(e) {
    if (currentScreen === 'main-screen') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = true;
    }
});

document.addEventListener('touchmove', function(e) {
    if (isSwipe && currentScreen === 'main-screen') {
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        
        const diffX = currentX - startX;
        const diffY = currentY - startY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            const topCard = document.querySelector('.profile-card');
            if (topCard) {
                const rotation = diffX * 0.1;
                topCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;
                topCard.style.opacity = 1 - Math.abs(diffX) / 200;
            }
        }
    }
});

document.addEventListener('touchend', function(e) {
    if (isSwipe && currentScreen === 'main-screen') {
        const diffX = currentX - startX;
        
        if (Math.abs(diffX) > 100) {
            if (diffX > 0) {
                likeCard();
            } else {
                rejectCard();
            }
        } else {
            const topCard = document.querySelector('.profile-card');
            if (topCard) {
                topCard.style.transform = '';
                topCard.style.opacity = '1';
            }
        }
        
        isSwipe = false;
    }
});

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tsunagaru AI プロトタイプが開始されました');
});
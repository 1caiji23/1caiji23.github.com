// 动态背景
function changeBackground() {
    const backgrounds = [
        'url("path/to/background1.jpg")',
        'url("path/to/background2.jpg")',
        'url("path/to/background3.jpg")'
    ];
    let currentIndex = 0;

    function updateBackground() {
        const homeSection = document.getElementById('home');
        homeSection.style.backgroundImage = backgrounds[currentIndex];
        homeSection.style.backgroundSize = 'cover';
        homeSection.style.backgroundPosition = 'center';
        currentIndex = (currentIndex + 1) % backgrounds.length;
    }

    updateBackground(); // 立即设置初始背景
    setInterval(updateBackground, 10000); // 每10秒更换一次背景
}

// 音乐播放器
function setupMusicPlayer() {
    const audio = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-button');
    const miniPlayPause = document.getElementById('mini-play-pause');
    const nowPlaying = document.getElementById('now-playing');

    let isPlaying = false;
    let debounceTimer;

    audio.addEventListener('loadeddata', () => {
        console.log("音频数据已加载");
    });

    audio.addEventListener('canplay', () => {
        console.log("音频可以开始播放");
    });

    audio.addEventListener('error', (e) => {
        console.error("音频加载错误:", e);
        console.error("错误代码:", audio.error.code);
        console.error("错误消息:", audio.error.message);
        nowPlaying.textContent = "音频加载失败";
        alert("音频加载失败，错误代码: " + audio.error.code);
    });

    function togglePlay() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (!isPlaying) {
                isPlaying = true;
                audio.play().then(() => {
                    console.log("音频开始播放");
                    playPauseButton.textContent = '暂停';
                    miniPlayPause.textContent = '⏸️';
                }).catch(error => {
                    console.error("播放失败:", error);
                    isPlaying = false;
                    if (error.name !== 'AbortError') {
                        alert("音频播放失败，错误信息: " + error.message);
                    }
                });
            } else {
                isPlaying = false;
                audio.pause();
                console.log("音频已暂停");
                playPauseButton.textContent = '播放';
                miniPlayPause.textContent = '▶️';
            }
        }, 200); // 200毫秒的防抖延迟
    }

    playPauseButton.addEventListener('click', togglePlay);
    miniPlayPause.addEventListener('click', togglePlay);

    // 添加播放结束事件监听器
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playPauseButton.textContent = '播放';
        miniPlayPause.textContent = '▶️';
    });
}

// 时间轴动画
function animateTimeline() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    timelineEvents.forEach(event => {
        observer.observe(event);
    });
}

// 平滑滚动到时间轴部分
function scrollToTimeline(e) {
    e.preventDefault();
    const timeline = document.getElementById('timeline');
    timeline.scrollIntoView({ behavior: 'smooth' });
}

// 添加新的文字动画函数
function animateTimelineText() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3 = entry.target.querySelector('h3');
                const p = entry.target.querySelector('p');
                
                // 重置动画
                h3.style.animation = 'none';
                p.style.animation = 'none';
                
                // 触发重排
                void h3.offsetWidth;
                void p.offsetWidth;
                
                // 重新开始动画
                h3.style.animation = 'textReveal 3s linear forwards';
                p.style.animation = 'textReveal 3s linear 0.5s forwards';
            }
        });
    }, { threshold: 0.5 });

    timelineEvents.forEach(event => {
        observer.observe(event);
    });
}

// 视差滚动效果
function setupParallax() {
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    });
}

// 平滑滚动到指定部分
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// 角色卡片动画
function animateCharacterCards() {
    const cards = document.querySelectorAll('.character-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// 添加打字机效果
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 页面加载完成后执行
window.addEventListener('load', () => {
    changeBackground();
    setupMusicPlayer();
    animateTimeline();
    animateTimelineText();
    setupParallax();
    smoothScroll();
    animateCharacterCards();

    // 为首页标题添加打字机效果
    const title = document.querySelector('#home h1');
    typeWriter(title, '欢迎来到凉宫春日的奇妙世界', 100);
});

// 添加页面切换动画
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('main');
    content.style.opacity = 0;
    content.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        content.style.opacity = 1;
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // 任务接受
    const acceptButtons = document.querySelectorAll('.accept-mission');
    acceptButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('你已经接受该任务，请在两天后提交。');
        });
    });

    // 查看凉宫春日详情
    const viewDetailsButton = document.querySelector('.view-details');
    viewDetailsButton.addEventListener('click', function() {
        window.location.href = 'https://zh.wikipedia.org/wiki/%E5%87%89%E5%AE%AB%E6%98%A5%E6%97%A5';
    });

    // 美图女仆装
    const mikurusCostume = document.getElementById('mikurus-costume');
    mikurusCostume.addEventListener('click', function() {
        window.open('https://www.cosplay.com/search/?q=Mikuru+Asahina', '_blank');
    });

    // 长门的眼镜
    const yukisGlasses = document.getElementById('yukis-glasses');
    yukisGlasses.addEventListener('click', function() {
        alert('你已经看到一切数据流');
    });

    // 申请加入
    const joinForm = document.getElementById('recruitment-form');
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('请在两日后到达SOS团。');
    });

    // 团规
    const rulesLink = document.getElementById('rules');
    rulesLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('1. 禁止无聊\n2. 寻找世界的奇迹与神秘\n3. 服从团长的一切命令\n4. 每周至少参加一次异常现象调查\n5. 违反团规者将受到春日大人的惩罚');
    });

    // 活动日志
    const activityLogLink = document.getElementById('activity-log');
    activityLogLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('暂无活动日志');
    });

    // 紧急联系
    const emergencyContactLink = document.getElementById('emergency-contact');
    emergencyContactLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('目前正在太空旅行');
    });

    // SOS团臂章
    const armband = document.getElementById('armband');
    armband.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let musicPlaying = false;

    function playMusic() {
        bgMusic.play().then(() => {
            console.log("音频开始播放");
            musicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> 音乐开关';
        }).catch(error => {
            console.error('播放失败:', error);
            // 不要在这里显示警告，因为这可能是正常的行为
        });
    }

    musicToggle.addEventListener('click', function(e) {
        e.preventDefault();
        if (musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i> 音乐开关';
            console.log("音频已暂停");
        } else {
            playMusic();
        }
    });

    // 移除自动播放尝试
    // playMusic();

    // 监听用户交互事件，以便在用户与页面交互后播放音乐
    document.body.addEventListener('click', function() {
        if (!musicPlaying) {
            playMusic();
        }
    }, { once: true });

    // 添加提示
    const musicPrompt = document.createElement('div');
    musicPrompt.textContent = '点击页面任意位置开始播放音乐';
    musicPrompt.style.position = 'fixed';
    musicPrompt.style.bottom = '20px';
    musicPrompt.style.left = '50%';
    musicPrompt.style.transform = 'translateX(-50%)';
    musicPrompt.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    musicPrompt.style.color = 'white';
    musicPrompt.style.padding = '10px';
    musicPrompt.style.borderRadius = '5px';
    document.body.appendChild(musicPrompt);

    // 在音乐开始播放后移除提示
    bgMusic.addEventListener('play', function() {
        musicPrompt.style.display = 'none';
    });
});

// 在文件末尾添加以下代码

document.addEventListener('DOMContentLoaded', function() {
    const nyanCat = document.getElementById('nyan-cat');
    const rainbow = document.getElementById('rainbow');
    let isRainbowVisible = true;

    nyanCat.addEventListener('click', function() {
        if (isRainbowVisible) {
            rainbow.style.display = 'none';
            isRainbowVisible = false;
        } else {
            rainbow.style.display = 'block';
            isRainbowVisible = true;
        }
    });

    // 随机改变 Nyan Cat 的颜色
    function changeNyanCatColor() {
        const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.querySelector('.body').style.backgroundColor = randomColor;
        document.querySelector('.tail').style.backgroundColor = randomColor;
        document.querySelector('.legs').style.backgroundColor = randomColor;
    }

    setInterval(changeNyanCatColor, 3000); // 每3秒改变一次颜色
});
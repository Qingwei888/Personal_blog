/* ===== 元素引用 ===== */
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const discoverBtn = document.getElementById('discoverBtn');
const scrollBtn = document.getElementById('scrollBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalBadge = document.getElementById('modalBadge');
const cursorGlow = document.getElementById('cursorGlow');
const backTop = document.getElementById('backTop');
const nav = document.getElementById('nav');
const badgeText = document.getElementById('badgeText');
const particleContainer = document.getElementById('particleContainer');
const rippleDemo = document.getElementById('rippleDemo');
const burstDemo = document.getElementById('burstDemo');
const glowDemo = document.getElementById('glowDemo');

/* ===== 文章数据 ===== */
const posts = {
  design: {
    badge: '设计',
    title: '一页设计的力量',
    text: '极简不等于单调。精心调配留白、色彩与互动，能够让每一次点击都像是一次微小的惊喜。好的设计让你感受不到"设计"的存在，只觉得一切都恰到好处。'
  },
  city: {
    badge: '随笔',
    title: '城市里的慢日子',
    text: '在城市的边缘，找到自己的节奏。用简单的文字记录瞬间，让忙碌的心灵得到片刻沉淀。慢下来，才能看见窗外的树影，听见街道的呼吸。'
  },
  code: {
    badge: '代码',
    title: '让功能成为惊喜',
    text: '一个按钮，不只是交互承载体，更是情绪表达。设计时考虑每次点击的反馈与意外，才会让页面更有灵魂。代码是手段，体验才是目的。'
  }
};

/* ===== 主题切换 ===== */
function initTheme() {
  const saved = localStorage.getItem('blog-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleIcon.innerHTML = '&#9788;';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('blog-theme', next || 'light');
  toggleIcon.innerHTML = next ? '&#9788;' : '&#9790;';

  // 切换动画
  toggleIcon.style.transform = 'rotate(180deg) scale(0.6)';
  setTimeout(() => {
    toggleIcon.style.transform = 'rotate(0deg) scale(1)';
  }, 200);
}

themeToggle.addEventListener('click', toggleTheme);

/* ===== 徽章文字轮播 ===== */
const badgeWords = ['探索', '灵感', '创造', '记录', '思考'];
let badgeIndex = 0;
setInterval(() => {
  badgeIndex = (badgeIndex + 1) % badgeWords.length;
  badgeText.style.opacity = '0';
  badgeText.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    badgeText.textContent = badgeWords[badgeIndex];
    badgeText.style.opacity = '1';
    badgeText.style.transform = 'translateY(0)';
  }, 300);
}, 3000);

/* ===== 光标光晕 ===== */
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

document.addEventListener('mouseover', (e) => {
  const target = e.target.closest('a, button, .post-card, .neo-btn');
  if (target) {
    cursorGlow.classList.add('visible');
  }
});

document.addEventListener('mouseout', (e) => {
  const target = e.target.closest('a, button, .post-card, .neo-btn');
  if (target) {
    cursorGlow.classList.remove('visible');
  }
});

/* ===== 磁力悬浮效果 ===== */
document.querySelectorAll('.magnetic').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const strength = 0.3;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

/* ===== 波纹扩散效果 ===== */
function createRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.classList.add('ripple-effect');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.appendChild(ripple);

  ripple.addEventListener('animationend', () => ripple.remove());
}

rippleDemo.addEventListener('click', (e) => {
  createRipple(e, rippleDemo);
  rippleDemo.style.transform = 'scale(0.94)';
  setTimeout(() => { rippleDemo.style.transform = ''; }, 150);
});

/* ===== 粒子迸发 ===== */
function createParticles(e, el) {
  const rect = el.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  const colors = ['#5b6ef5', '#f062a0', '#f5a623', '#7b8df8', '#fff'];

  for (let i = 0; i < 14; i++) {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    const angle = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
    const distance = 30 + Math.random() * 50;
    const size = 3 + Math.random() * 5;
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${cx}px;
      top: ${cy}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --dx: ${Math.cos(angle) * distance}px;
      --dy: ${Math.sin(angle) * distance}px;
    `;
    el.appendChild(particle);

    particle.addEventListener('animationend', () => particle.remove());
  }
}

burstDemo.addEventListener('click', (e) => {
  createParticles(e, burstDemo);
  burstDemo.style.transform = 'scale(0.9)';
  setTimeout(() => { burstDemo.style.transform = ''; }, 200);
});

/* ===== 发现按钮 - 粒子迸发 + 滚动 ===== */
discoverBtn.addEventListener('click', (e) => {
  createParticles(e, particleContainer);

  setTimeout(() => {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.borderColor = 'var(--accent)';
        card.style.boxShadow = '0 0 40px var(--accent-glow)';
        setTimeout(() => {
          card.style.borderColor = '';
          card.style.boxShadow = '';
        }, 1400);
      }, i * 160);
    });
  }, 300);
});

/* ===== 浏览文章按钮 ===== */
scrollBtn.addEventListener('click', () => {
  document.getElementById('posts').scrollIntoView({ behavior: 'smooth' });
});

/* ===== 文章弹窗 ===== */
document.querySelectorAll('.link-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.post;
    const post = posts[key];
    if (!post) return;
    modalBadge.textContent = post.badge;
    modalTitle.textContent = post.title;
    modalText.textContent = post.text;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeModalFn() {
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

closeModal.addEventListener('click', closeModalFn);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFn();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModalFn();
});

/* ===== 光晕按钮 hover 追踪 ===== */
glowDemo.addEventListener('mousemove', (e) => {
  const rect = glowDemo.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  glowDemo.style.setProperty('--mouse-x', x + 'px');
  glowDemo.style.setProperty('--mouse-y', y + 'px');
});

/* ===== 滚动监听 ===== */
function onScroll() {
  // 导航栏阴影
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // 回到顶部按钮
  if (window.scrollY > 500) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }

  // 滚动揭示
  document.querySelectorAll('.reveal').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.86) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ===== 回到顶部 ===== */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== 计数器动画 ===== */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach((el) => {
    const target = parseInt(el.dataset.count);
    if (!target || el.dataset.animated) return;
    el.dataset.animated = '1';
    const duration = 1400;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  });
}

// 当关于区进入视野时触发计数
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      aboutObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const aboutPanel = document.getElementById('about');
if (aboutPanel) aboutObserver.observe(aboutPanel);

/* ===== 初始化 ===== */
initTheme();
onScroll(); // 初始化滚动状态

/**
 * Valentine for Jaan - Surprises & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHearts();
  initEnvelope();
  initMainReveal();
  initConfetti();
  initDecoder();
  initLoveMeter();
  initGalleryHearts();
  initReplay();
  initCursorHearts();
  initSecretCode();
});

// ----- Secret: type "jaan" for a surprise -----
function initSecretCode() {
  let buffer = '';
  const secret = 'jaan';
  document.addEventListener('keypress', (e) => {
    buffer = (buffer + e.key.toLowerCase()).slice(- secret.length);
    if (buffer === secret) {
      showSecretMessage();
      buffer = '';
    }
  });
}

function showSecretMessage() {
  const div = document.createElement('div');
  div.innerHTML = '💕 You found the secret! You really are my Jaan. I love you! 💕';
  div.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #e8a0a8, #c76b7a); color: white;
    padding: 1.5rem 2rem; border-radius: 20px; font-weight: 600; text-align: center;
    box-shadow: 0 20px 60px rgba(199,107,122,0.4); z-index: 10000;
    animation: secretPop 0.5s ease;
    font-family: 'Quicksand', sans-serif; max-width: 90%; font-size: 1.1rem;
  `;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes secretPop {
      from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
      to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3500);
}

// ----- Floating hearts in background -----
function initFloatingHearts() {
  const container = document.getElementById('hearts-bg');
  const hearts = ['💕', '💗', '💖', '❤️', '🌸', '💝', '✨'];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 15 + 's';
    heart.style.animationDuration = 12 + Math.random() * 8 + 's';
    container.appendChild(heart);
  }
}

// ----- Envelope open & letter -----
function initEnvelope() {
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');

  envelope.addEventListener('click', (e) => {
    if (letter.classList.contains('revealed')) return;
    envelope.classList.add('open');
    setTimeout(() => {
      letter.classList.add('revealed');
    }, 400);
  });
}

// ----- Open main content from letter -----
function initMainReveal() {
  const openBtn = document.getElementById('open-main');
  const mainContent = document.getElementById('main-content');
  const envelopeSection = document.getElementById('envelope-section');

  openBtn.addEventListener('click', () => {
    envelopeSection.style.opacity = '0';
    envelopeSection.style.transform = 'scale(0.95)';
    envelopeSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      envelopeSection.style.display = 'none';
      mainContent.classList.remove('hidden');
      mainContent.style.animation = 'fadeIn 0.6s ease';
      document.body.style.overflow = 'auto';
    }, 500);
  });
}

// Add fadeIn for main
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

// ----- Confetti burst -----
function initConfetti() {
  const btn = document.getElementById('confetti-btn');
  const canvas = document.getElementById('confetti-canvas');
  if (!btn || !canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const shapes = ['💕', '💗', '💖', '❤️', '🌸', '✨', '💝'];
  let particles = [];

  function burst() {
    particles = [];
    const count = 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        text: shapes[Math.floor(Math.random() * shapes.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 4,
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
        size: 14 + Math.random() * 10,
      });
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.life -= p.decay;
      if (p.life <= 0) return false;
      ctx.globalAlpha = p.life;
      ctx.font = `${p.size}px sans-serif`;
      ctx.fillText(p.text, p.x, p.y);
      return true;
    });
    ctx.globalAlpha = 1;
    if (particles.length > 0) {
      animationId = requestAnimationFrame(draw);
    }
  }

  btn.addEventListener('click', () => {
    burst();
    if (animationId) cancelAnimationFrame(animationId);
    draw();
  });
}

// ----- Decoder reveal -----
function initDecoder() {
  const btn = document.getElementById('decode-btn');
  const decoded = document.getElementById('decoded-msg');
  if (!btn || !decoded) return;

  btn.addEventListener('click', () => {
    decoded.classList.remove('hidden');
    decoded.classList.add('revealed');
    btn.textContent = '💕 You decoded my heart!';
    btn.disabled = true;
  });
}

// ----- Love meter -----
function initLoveMeter() {
  const fill = document.getElementById('meter-fill');
  const btn = document.getElementById('meter-btn');
  const label = document.getElementById('meter-label');
  if (!fill || !btn) return;

  let level = 0;
  const messages = [
    'Tap to fill my love →',
    'More! More! 💕',
    'Almost there...',
    'Overflowing with love!',
    'Infinite love for Jaan! 💖',
  ];

  btn.addEventListener('click', () => {
    if (level >= 100) {
      level = 0;
      fill.style.width = '0%';
      label.textContent = messages[0];
      btn.textContent = 'Fill it up! 💖';
      return;
    }
    level = Math.min(100, level + 25);
    fill.style.width = level + '%';
    label.textContent = messages[Math.min(Math.floor(level / 25), messages.length - 1)];
    if (level >= 100) {
      btn.textContent = 'Reset & fill again 💕';
    }
  });
}

// ----- Gallery hearts - toast on click -----
function initGalleryHearts() {
  const hearts = document.querySelectorAll('.gallery-heart');
  const toast = document.getElementById('gallery-toast');
  if (!toast) return;

  hearts.forEach((el) => {
    el.addEventListener('click', () => {
      const msg = el.getAttribute('data-msg');
      toast.textContent = msg;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 2000);
    });
  });
}

// ----- Replay - show envelope again -----
function initReplay() {
  const replayBtn = document.getElementById('replay-btn');
  const mainContent = document.getElementById('main-content');
  const envelopeSection = document.getElementById('envelope-section');
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');

  if (!replayBtn) return;

  replayBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    envelopeSection.style.display = 'flex';
    envelopeSection.style.opacity = '1';
    envelopeSection.style.transform = 'scale(1)';
    envelope.classList.remove('open');
    letter.classList.remove('revealed');
  });
}

// ----- Cursor heart trail (subtle surprise) -----
function initCursorHearts() {
  const container = document.getElementById('cursor-hearts');
  if (!container) return;

  const hearts = ['💕', '💗', '💖'];
  let lastTime = 0;
  const throttle = 150;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < throttle) return;
    lastTime = now;

    const heart = document.createElement('span');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    const tx = (Math.random() - 0.5) * 40;
    const ty = (Math.random() - 0.5) * 40;
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });
}

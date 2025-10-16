(() => {
  const heroCanvas = document.getElementById('particles-hero');
  if (!heroCanvas) return;
  const heroCtx = heroCanvas.getContext('2d');

  const heroColors = ['#23d7ff', '#2c4dff', '#8338ec'];
  let heroParticles = [];
  const heroNum = 200;

  function resizeHeroCanvas() {
    const section = document.querySelector('.hero-section') || document.body;
    const dpr = window.devicePixelRatio || 1;
    heroCanvas.width = section.offsetWidth * dpr;
    heroCanvas.height = section.offsetHeight * dpr;
    heroCtx.setTransform(1, 0, 0, 1, 0, 0);
    heroCtx.scale(dpr, dpr);
  }

  class HeroParticle {
    constructor(x, y, size, color, vx, vy) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.vx = vx;
      this.vy = vy;
    }
    draw() {
      heroCtx.beginPath();
      heroCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      heroCtx.fillStyle = this.color;
      heroCtx.fill();
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x <= 0 || this.x >= heroCanvas.clientWidth) this.vx *= -1;
      if (this.y <= 0 || this.y >= heroCanvas.clientHeight) this.vy *= -1;
    }
  }

  function connectHeroParticles() {
    for (let a = 0; a < heroParticles.length; a++) {
      for (let b = a + 1; b < heroParticles.length; b++) {
        const dx = heroParticles[a].x - heroParticles[b].x;
        const dy = heroParticles[a].y - heroParticles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          heroCtx.strokeStyle = 'rgba(35,215,255,' + (1 - dist / 100) + ')';
          heroCtx.lineWidth = 1;
          heroCtx.beginPath();
          heroCtx.moveTo(heroParticles[a].x, heroParticles[a].y);
          heroCtx.lineTo(heroParticles[b].x, heroParticles[b].y);
          heroCtx.stroke();
        }
      }
    }
  }

  function initHeroParticles() {
    heroParticles = [];
    const w = heroCanvas.clientWidth;
    const h = heroCanvas.clientHeight;
    for (let i = 0; i < heroNum; i++) {
      const s = Math.random() * 2 + 1;
      const x = Math.random() * w;
      const y = Math.random() * h;
      const c = heroColors[Math.floor(Math.random() * heroColors.length)];
      const vx = (Math.random() - 0.5) * 0.5;
      const vy = (Math.random() - 0.5) * 0.5;
      heroParticles.push(new HeroParticle(x, y, s, c, vx, vy));
    }
  }

  function animateHeroParticles() {
    heroCtx.clearRect(0, 0, heroCanvas.clientWidth, heroCanvas.clientHeight);
    for (const p of heroParticles) {
      p.update();
      p.draw();
    }
    connectHeroParticles();
    requestAnimationFrame(animateHeroParticles);
  }

  window.addEventListener('resize', () => {
    resizeHeroCanvas();
    initHeroParticles();
  });

  resizeHeroCanvas();
  initHeroParticles();
  animateHeroParticles();
})();

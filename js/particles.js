const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

const colors = ['#23d7ff', '#2c4dff', '#8338ec'];
let particlesArray = [];
let numParticles;

function setParticleCount() {
  const w = window.innerWidth;
  if (w >= 1200) numParticles = 320;
  else if (w >= 768) numParticles = 160;
  else numParticles = 70;
}

function resizeCanvas() {
  const section = document.querySelector('.transition-section') || document.body;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = section.offsetWidth * dpr;
  canvas.height = section.offsetHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

class Particle {
  constructor(x, y, size, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x <= 0 || this.x >= canvas.clientWidth) this.vx *= -1;
    if (this.y <= 0 || this.y >= canvas.clientHeight) this.vy *= -1;
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.strokeStyle = 'rgba(35,215,255,' + (1 - distance / 100) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  setParticleCount();
  particlesArray = [];
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * width;
    const y = Math.random() * height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const vx = (Math.random() - 0.5) * 0.7;
    const vy = (Math.random() - 0.5) * 0.7;
    particlesArray.push(new Particle(x, y, size, color, vx, vy));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
ctx.fillStyle = 'transparent'; // <— ovo osigurava providnu pozadinu
ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  
  for (const p of particlesArray) {
    p.update();
    p.draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
animateParticles();

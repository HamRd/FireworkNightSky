// 获取画布元素和上下文
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 花火粒子对象
class FireworkParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;
    this.velocity = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 6 - 3
    };
    this.alpha = 1;
  }

  // 更新粒子位置和透明度
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }

  // 绘制粒子
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.closePath();
  }
}

// 创建花火
function createFirework(x, y) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']; // 可自定义颜色
  for (let i = 0; i < 50; i++) {
    const particle = new FireworkParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
    fireworks.push(particle);
  }
}

// 存储花火粒子
const fireworks = [];

// 鼠标点击事件触发花火
window.addEventListener('click', (event) => {
  createFirework(event.clientX, event.clientY);
});

// 动画循环
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// 开始动画
animate();

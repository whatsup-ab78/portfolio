const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const music = document.getElementById('bgMusic');
const profile = document.getElementById('profileImage');

let matrixActive = false;
let animationInterval;

profile.addEventListener('click', () => {
  if (matrixActive) return;
  matrixActive = true;

  // Show canvas
  canvas.style.display = 'block';

  // Play music
  music.play();

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "アカサタナハマヤラワ0123456789".split("");
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  animationInterval = setInterval(drawMatrix, 30);
});

// Stop music + animation when user scrolls away from Home
window.addEventListener('scroll', () => {
  if (!matrixActive) return;

  if (window.scrollY > window.innerHeight * 0.7) {
    clearInterval(animationInterval);
    canvas.style.display = 'none';
    music.pause();
    music.currentTime = 0;
    matrixActive = false;
  }
});

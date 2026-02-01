// Add JS here// ========================================
// 🎨 CUSTOMIZABLE VARIABLES - CHANGE THESE!
// ========================================
const CONFIG = {
    name: "SARAH", // Use UPPERCASE for Bebas Neue font!
    age: 21,
    message: "Happy birthday to the most amazing person ever!",
  
    // Music settings
    musicFile: "/assets/audio.mp3", // Your music file name or URL
  
    // Confetti settings
    confettiCount: 150,
  
    // Emoji rain settings
    emojiList: ["🎂", "🎉", "🎊", "🎈", "✨", "💖", "🌟", "🎁"],
  };
  
  // ========================================
  // START EXPERIENCE
  // ========================================
  function startExperience() {
    const intro = document.getElementById("introScreen");
    intro.classList.add("hidden");
  
    // Start music immediately on button click
    playMusic();
  
    setTimeout(() => {
      intro.style.display = "none";
      showSections();
      startConfetti();
      createEmojiRain();
    }, 800);
  }
  
  // ========================================
  // SHOW SECTIONS WITH SCROLL
  // ========================================
  function showSections() {
    const sections = document.querySelectorAll(".section");
  
    // Initial animation
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("visible");
      }, index * 300);
    });
  
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );
  
    sections.forEach((section) => observer.observe(section));
  }
  
  // ========================================
  // CONFETTI ANIMATION
  // ========================================
  function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const confetti = [];
    const colors = [
      getComputedStyle(document.documentElement)
        .getPropertyValue("--confetti-1")
        .trim(),
      getComputedStyle(document.documentElement)
        .getPropertyValue("--confetti-2")
        .trim(),
      getComputedStyle(document.documentElement)
        .getPropertyValue("--confetti-3")
        .trim(),
      getComputedStyle(document.documentElement)
        .getPropertyValue("--confetti-4")
        .trim(),
      getComputedStyle(document.documentElement)
        .getPropertyValue("--confetti-5")
        .trim(),
      getComputedStyle(document.documentElement)
        .getPropertyValue("--confetti-6")
        .trim(),
    ];
  
    // Create confetti particles
    for (let i = 0; i < CONFIG.confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * CONFIG.confettiCount,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }
  
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      confetti.forEach((c, i) => {
        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();
  
        // Update confetti position
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(c.d);
        c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;
  
        // Reset confetti when it goes off screen
        if (c.y > canvas.height) {
          confetti[i] = {
            x: Math.random() * canvas.width,
            y: -20,
            r: c.r,
            d: c.d,
            color: c.color,
            tilt: c.tilt,
            tiltAngleIncremental: c.tiltAngleIncremental,
            tiltAngle: c.tiltAngle,
          };
        }
      });
  
      requestAnimationFrame(drawConfetti);
    }
  
    drawConfetti();
  }
  
  // ========================================
  // EMOJI RAIN
  // ========================================
  function createEmojiRain() {
    setInterval(() => {
      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.textContent =
        CONFIG.emojiList[Math.floor(Math.random() * CONFIG.emojiList.length)];
      emoji.style.left = Math.random() * 100 + "%";
      emoji.style.animationDuration = Math.random() * 3 + 2 + "s";
      document.body.appendChild(emoji);
  
      setTimeout(() => {
        emoji.remove();
      }, 5000);
    }, 300);
  }
  
  // ========================================
  // MUSIC CONTROL
  // ========================================
  let musicPlaying = false;
  const bgMusic = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");
  
  function toggleMusic() {
    if (CONFIG.musicFile) {
      if (musicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = "🔇";
      } else {
        bgMusic.play();
        musicIcon.textContent = "🔊";
      }
      musicPlaying = !musicPlaying;
    }
  }
  
  function playMusic() {
    if (CONFIG.musicFile) {
      bgMusic.src = CONFIG.musicFile;
      bgMusic
        .play()
        .then(() => {
          musicPlaying = true;
          musicIcon.textContent = "🔊";
        })
        .catch((err) => {
          console.log("Music play failed:", err);
          musicPlaying = false;
          musicIcon.textContent = "🔇";
        });
    } else {
      // No music file set
      musicIcon.textContent = "🔇";
    }
  }
  
  // ========================================
  // WINDOW RESIZE HANDLER
  // ========================================
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // ========================================
  // INITIALIZE ON PAGE LOAD
  // ========================================
  document.addEventListener("DOMContentLoaded", () => {
    // Update name and age from config
    document.getElementById("birthdayName").textContent = CONFIG.name;
  
    // You can add more dynamic content updates here
  });
  
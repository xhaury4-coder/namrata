(() => {
  const progressFill = document.getElementById("progressFill");
  const navDots = document.querySelectorAll(".nav-dot");
  const chapters = document.querySelectorAll(".chapter, .hero");
  const startBtn = document.getElementById("startStory");
  const reveals = document.querySelectorAll(".reveal");

  // Hero reveals on load
  const showReveals = () => {
    reveals.forEach((el) => el.classList.add("visible"));
  };

  // Small delay so paint settles
  requestAnimationFrame(() => {
    setTimeout(showReveals, 80);
  });

  // Start button → first chapter
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      document.getElementById("chapter-1")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Progress + active chapter
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = `${Math.min(progress, 100)}%`;

    // Active chapter detection
    let current = 0;
    chapters.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) {
        current = i;
      }
    });

    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });

    // Chapter fade
    document.querySelectorAll(".chapter").forEach((ch) => {
      const rect = ch.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      ch.classList.toggle("in-view", inView);
    });
  };

  // Nav click
  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const id = `chapter-${dot.dataset.chapter}`;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Throttled scroll
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial
  updateProgress();

  // Soft parallax on orbs (very subtle)
  const orbs = document.querySelectorAll(".orb");
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY * 0.03;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translateY(${y * factor}px)`;
      });
    },
    { passive: true }
  );
})();

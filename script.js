
document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const openHeartBtn = document.getElementById("openHeartBtn");
  const mainContent = document.getElementById("mainContent");

  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  const letterBtn = document.getElementById("letterBtn");
  const loveLetter = document.getElementById("loveLetter");

  const chanceBtn = document.getElementById("chanceBtn");
  const timeBtn = document.getElementById("timeBtn");
  const responseBox = document.getElementById("responseBox");
  const responseTitle = document.getElementById("responseTitle");
  const responseText = document.getElementById("responseText");
  const closeResponseBtn = document.getElementById("closeResponseBtn");

  const heartsBg = document.getElementById("heartsBg");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  // 1. Welcome screen
  openHeartBtn.addEventListener("click", async function () {
    welcomeScreen.classList.add("leaving");

    mainContent.classList.remove("hidden");

    // Music starts only after the visitor clicks.
    try {
      await bgMusic.play();
      musicBtn.textContent = "♫ Pause Music";
      musicBtn.setAttribute("aria-label", "Pause background music");
    } catch (error) {
      musicBtn.textContent = "♫ Play Music";
    }

    // Remove the welcome screen after its fade animation.
    window.setTimeout(function () {
      welcomeScreen.style.display = "none";
    }, 750);

    createHearts();
  });

  // 2. Background music play / pause
  musicBtn.addEventListener("click", async function () {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicBtn.textContent = "♫ Pause Music";
        musicBtn.setAttribute("aria-label", "Pause background music");
      } catch (error) {
        musicBtn.textContent = "♫ Music unavailable";
      }
    } else {
      bgMusic.pause();
      musicBtn.textContent = "♫ Play Music";
      musicBtn.setAttribute("aria-label", "Play background music");
    }
  });

  // Update the music button if playback ends or fails.
  bgMusic.addEventListener("pause", function () {
    musicBtn.textContent = "♫ Play Music";
    musicBtn.setAttribute("aria-label", "Play background music");
  });

  bgMusic.addEventListener("play", function () {
    musicBtn.textContent = "♫ Pause Music";
    musicBtn.setAttribute("aria-label", "Pause background music");
  });

  bgMusic.addEventListener("error", function () {
    musicBtn.textContent = "♫ Music unavailable";
    musicBtn.title = "Check music/romantic.mp3";
  });

  // 3. Floating heart animation
  function createHearts() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const heartSymbols = ["♡", "♥", "💕", "♡"];

    function addHeart() {
      if (document.hidden || !heartsBg.isConnected) return;

      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

      heart.style.left = Math.random() * 100 + "%";
      heart.style.fontSize = 14 + Math.random() * 22 + "px";
      heart.style.animationDuration = 7 + Math.random() * 7 + "s";

      heartsBg.appendChild(heart);

      heart.addEventListener("animationend", function () {
        heart.remove();
      });
    }

    // Keep the number of animated hearts limited.
    window.setInterval(function () {
      if (heartsBg.childElementCount < 15) {
        addHeart();
      }
    }, 850);
  }

  // 4. Open and close the romantic letter
  letterBtn.addEventListener("click", function () {
    const isOpening = loveLetter.classList.contains("hidden");

    loveLetter.classList.toggle("hidden");
    letterBtn.setAttribute("aria-expanded", String(isOpening));

    if (isOpening) {
      letterBtn.querySelector(".envelope-text").textContent =
        "Your letter is open ♡";

      loveLetter.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    } else {
      letterBtn.querySelector(".envelope-text").textContent =
        "Open your letter";
    }
  });

  // 5. Final question: willing to give a chance
  chanceBtn.addEventListener("click", function () {
    responseTitle.textContent = "Thank you for hearing my heart. 💗";

    responseText.textContent =
      "If this is what you want too, I would be grateful for the chance " +
      "to take things slowly, listen to you, and show my sincerity " +
      "through my actions. One step at a time.";

    showResponse();
  });

  // 6. Final question: needs more time
  timeBtn.addEventListener("click", function () {
    responseTitle.textContent = "Take all the time you need. 🤍";

    responseText.textContent =
      "I understand that you may need time and space. " +
      "I won't rush you or expect an immediate answer. " +
      "Your feelings and your decision deserve respect.";

    showResponse();
  });

  function showResponse() {
    responseBox.classList.remove("hidden");

    responseBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  closeResponseBtn.addEventListener("click", function () {
    responseBox.classList.add("hidden");
  });

  // 7. Enlarge photos when clicked
  document.querySelectorAll(".photo-card img").forEach(function (photo) {
    photo.addEventListener("click", function () {
      if (!photo.complete || photo.naturalWidth === 0) {
        alert("This photo could not be loaded. Please check the image file.");
        return;
      }

      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
      lightbox.classList.remove("hidden");
      lightboxClose.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImage.src = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // 8. Close the enlarged photo with Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (!lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    }
  });
});

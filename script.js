// Welcome button
const startBtn = document.getElementById("startBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");

startBtn.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Try to play music after the click
    const music = document.getElementById("bgMusic");

    if (music) {
        music.play().then(function () {
            document.getElementById("musicBtn").textContent =
                "⏸ Pause Music";
        }).catch(function () {
            // Music can be started using the music button
        });
    }
});


// Background music button
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

musicBtn.addEventListener("click", function () {
    if (bgMusic.paused) {
        bgMusic.play().then(function () {
            musicBtn.textContent = "⏸ Pause Music";
        }).catch(function () {
            alert("Music could not play. Please check romantic.mp3.");
        });
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Play Music";
    }
});


// Open and close the love letter
const letterBtn = document.getElementById("letterBtn");
const letterContent = document.getElementById("letterContent");

letterBtn.addEventListener("click", function () {
    letterContent.classList.toggle("hidden");

    if (letterContent.classList.contains("hidden")) {
        letterBtn.textContent = "Open My Letter 💗";
    } else {
        letterBtn.textContent = "Close My Letter 💌";
    }
});


// Final question buttons
const yesBtn = document.getElementById("yesBtn");
const timeBtn = document.getElementById("timeBtn");
const finalMessage = document.getElementById("finalMessage");

yesBtn.addEventListener("click", function () {
    finalMessage.textContent =
        "Thank you for hearing my heart, Goongoon. ❤️ " +
        "We can take things slowly, talk honestly, and see what feels right for both of us. 💗";

    finalMessage.classList.remove("hidden");
});

timeBtn.addEventListener("click", function () {
    finalMessage.textContent =
        "I understand, Goongoon. ❤️ Take all the time you need. " +
        "I respect your feelings and your decision. 🌷";

    finalMessage.classList.remove("hidden");
});


// Photo lightbox
const photos = document.querySelectorAll(".memory-photo");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

photos.forEach(function (photo) {
    photo.addEventListener("click", function () {
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
        lightbox.classList.remove("hidden");
    });
});

closeLightbox.addEventListener("click", function () {
    lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.add("hidden");
    }
});


// Floating hearts
const heartsContainer = document.getElementById("heartsContainer");

if (heartsContainer) {
    const heartSymbols = ["❤️", "💗", "💕", "💖", "🌸"];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement("span");

        heart.textContent =
            heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        heart.className = "floating-heart";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDelay = Math.random() * 8 + "s";
        heart.style.animationDuration = 6 + Math.random() * 8 + "s";

        heartsContainer.appendChild(heart);
    }
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const hero = document.querySelector(".hero");
const heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;
let heroTimer;

function showHeroSlide(index) {
  if (!heroSlides.length) return;
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === heroIndex);
  });
}

function startHeroSlider() {
  if (heroSlides.length < 2) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHeroSlide(heroIndex + 1), 4200);
}

if (heroSlides.length) {
  if (hero) {
    hero.addEventListener("mouseenter", () => window.clearInterval(heroTimer));
    hero.addEventListener("mouseleave", startHeroSlider);
  }

  startHeroSlider();
}

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const shouldShow = filter === "all" || item.dataset.category === filter;
      item.style.display = shouldShow ? "" : "none";
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox button");

document.querySelectorAll("[data-lightbox]").forEach((image) => {
  image.addEventListener("click", () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightbox.classList.add("open");
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("open");
  lightboxImg.removeAttribute("src");
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const nav = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Add more certificates here. Put PNG files in assets/certificates/
// and add a new object below with your certificate title and the image path to that PNG file.
const certificates = [
  { title: "Docker dla WebDevelopera", image: "assets/certificates/cert-docker.png" },
  { title: "HTML i CSS", image: "assets/certificates/cert-html-css.png" },
  { title: "Linux", image: "assets/certificates/cert-linux.png" },
  { title: "Tworzenie WWW od Podstaw", image: "assets/certificates/cert-wordpress.png" },
  { title: "ESLint i Prettier", image: "assets/certificates/cert-javascript.png" },
  { title: "HTTP i API", image: "assets/certificates/cert-api.png" },
  { title: "Podstawy pracy z Cursor IDE", image: "assets/certificates/cert-cursor.png" },
  { title: "Programowanie w Java", image: "assets/certificates/cert-java.png" },
  { title: "Mini CMS z Vue", image: "assets/certificates/cert-vue.png" },
  { title: "Nowoczesny Webdesign", image: "assets/certificates/cert-webdesign.png" },
  { title: "Strony WWW z Jekyll i GitHub Pages", image: "assets/certificates/cert-jekyll-github-pages.png" },
  { title: "System Operacyjny w CSS cz.1", image: "assets/certificates/cert-css-os-1.png" },
  { title: "System Operacyjny w CSS cz.2", image: "assets/certificates/cert-css-os-2.png" },
  { title: "Techniki Tworzenia Nawigacji z HTML i CSS", image: "assets/certificates/cert-navigation-html-css.png" },
  { title: "Testowanie Aplikacji w Symfony2", image: "assets/certificates/cert-symfony-testing.png" },
  { title: "Budowanie Marki Osobistej", image: "assets/certificates/cert-personal-brand.png" },
  {
    title: "Czy przyszłość to meta ludzie i wirtualni influencerzy",
    image: "assets/certificates/cert-virtual-influencers.png",
  },
  { title: "Przydatne Funkcje Miro do Warsztatów z Klientem", image: "assets/certificates/cert-miro.png" },
];

const carousel = document.querySelector("#certificateCarousel");
const caption = document.querySelector("#carouselCaption");
const dots = document.querySelector("#carouselDots");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let activeIndex = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
const certificateCards = [];
const dotButtons = [];

function wrapIndex(index) {
  return (index + certificates.length) % certificates.length;
}

function getPosition(index) {
  const previous = wrapIndex(activeIndex - 1);
  const next = wrapIndex(activeIndex + 1);

  if (index === activeIndex) return "is-active";
  if (index === previous) return "is-prev";
  if (index === next) return "is-next";
  return "is-far";
}

function renderCarousel() {
  carousel.innerHTML = "";
  dots.innerHTML = "";
  certificateCards.length = 0;
  dotButtons.length = 0;

  certificates.forEach((certificate, index) => {
    const card = document.createElement("button");
    card.className = `certificate-card ${getPosition(index)}`;
    card.type = "button";
    card.dataset.shortTitle = certificate.title;
    card.setAttribute("aria-label", `Open certificate: ${certificate.title}`);

    const image = document.createElement("img");
    image.src = certificate.image;
    image.alt = certificate.title;
    image.loading = index > 2 ? "lazy" : "eager";

    card.appendChild(image);
    card.addEventListener("click", () => {
      if (index === activeIndex) {
        openLightbox(index);
      } else {
        setActiveIndex(index);
      }
    });

    carousel.appendChild(card);
    certificateCards.push(card);

    const dot = document.createElement("button");
    dot.className = `carousel-dot ${index === activeIndex ? "is-active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Show certificate ${index + 1}`);
    dot.addEventListener("click", () => {
      setActiveIndex(index);
    });
    dots.appendChild(dot);
    dotButtons.push(dot);
  });

  updateCarousel();
}

function updateCarousel() {
  certificateCards.forEach((card, index) => {
    card.className = `certificate-card ${getPosition(index)}`;
    card.setAttribute("aria-current", index === activeIndex ? "true" : "false");
  });

  dotButtons.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
  });

  caption.textContent = `${activeIndex + 1} / ${certificates.length} - ${certificates[activeIndex].title}`;
}

function setActiveIndex(index) {
  activeIndex = wrapIndex(index);
  updateCarousel();
  if (lightbox.classList.contains("is-open")) {
    updateLightbox();
  }
}

function showPrevious() {
  setActiveIndex(activeIndex - 1);
}

function showNext() {
  setActiveIndex(activeIndex + 1);
}

function openLightbox(index) {
  activeIndex = index;
  updateLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function updateLightbox() {
  const certificate = certificates[activeIndex];
  lightboxImage.src = certificate.image;
  lightboxImage.alt = certificate.title;
  lightboxCaption.textContent = certificate.title;
}

prevButton.addEventListener("click", showPrevious);
nextButton.addEventListener("click", showNext);
lightboxPrev.addEventListener("click", showPrevious);
lightboxNext.addEventListener("click", showNext);
lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPrevious();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

carousel.addEventListener("touchstart", (event) => {
  startX = event.touches[0].clientX;
  currentX = startX;
  isDragging = true;
});

carousel.addEventListener("touchmove", (event) => {
  if (!isDragging) return;
  currentX = event.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (!isDragging) return;
  const distance = currentX - startX;

  if (Math.abs(distance) > 45) {
    distance > 0 ? showPrevious() : showNext();
  }

  isDragging = false;
});

renderCarousel();

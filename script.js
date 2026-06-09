const nav = document.querySelector(".nav-links");
const menuToggle = document.querySelector(".menu-toggle");
const languageToggle = document.querySelector(".language-toggle");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const heroCanvas = document.querySelector("#heroNetwork");
const terminalCode = document.querySelector(".hero-panel code");
const themeToggle = document.querySelector(".theme-toggle");
const typingText = document.querySelector("#typingText");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const progressCards = document.querySelectorAll(".skill-progress");

const translations = {
  pl: {
    pageTitle: "Zbigniew Łamaszewski | Portfolio IT",
    metaDescription:
      "Portfolio IT Zbigniewa Łamaszewskiego: Linux, Docker, web development, sieci, bazy danych i certyfikaty.",
    languageButton: "EN",
    languageLabel: "Zmień język na angielski",
    brand: "Zbigniew Łamaszewski",
    nav: ["O mnie", "Umiejętności", "Projekty", "Certyfikaty", "Kontakt"],
    heroEyebrow: "Portfolio IT",
    heroName: "Zbigniew Łamaszewski",
    heroRole: "Student IT / Junior IT / Docker, Linux, Web, Sieci",
    heroText:
      "Tworzę praktyczne projekty laboratoryjne IT, uczę się nowoczesnych narzędzi infrastrukturalnych i łączę administrację systemami z web developmentem, API, bazami danych oraz podstawami sieci.",
    heroPrimary: "Zobacz projekty",
    heroSecondary: "Zobacz certyfikaty",
    aboutEyebrow: "O mnie",
    aboutHeading: "Uczę się przez budowanie realnych środowisk IT.",
    aboutText:
      "Rozwijam umiejętności IT przez praktyczną pracę z Linuxem, Dockerem, sieciami, web developmentem i bazami danych. Skupiam się na tym, jak usługi są wdrażane, łączone, monitorowane i utrzymywane: od serwerów Ubuntu i kontenerów po API, projekty SQL oraz responsywne strony.",
    skillsEyebrow: "Umiejętności",
    skillsHeading: "Stos technologiczny",
    projectsEyebrow: "Projekty",
    projectsHeading: "Infrastruktura, web i praktyka baz danych",
    certificatesEyebrow: "Certyfikaty",
    certificatesHeading: "Certyfikaty kursów",
    certificatesLead:
      "Przeglądaj certyfikaty w karuzeli, przesuwaj na telefonie albo otwórz wybrany certyfikat w pełnym ekranie.",
    contactEyebrow: "Kontakt",
    contactHeading: "Porozmawiajmy",
    footer: "Gotowe do uruchomienia jako statyczna strona przez GitHub Pages, Docker albo Nginx.",
    terminal: `$ docker ps
ubuntu-server     uruchomiony
nginx-web         online
wordpress-db      zdrowy
portainer         aktywny

$ skills --focus
linux docker sieci web sql`,
    projectTitles: [
      "Serwer Docker w VirtualBox z Ubuntu",
      "Kontener Nginx",
      "Panel Portainer",
      "WordPress + MariaDB w Dockerze",
      "Spring Boot API",
      "Projekt SQL",
    ],
    projectTexts: [
      "Lokalne laboratorium serwerowe do ćwiczenia administracji Linuxem, konfiguracji Dockera i wdrażania usług.",
      "Skonteneryzowany serwer WWW przygotowany do hostingu statycznego i nauki reverse proxy.",
      "Interfejs do zarządzania Dockerem, kontenerami, obrazami, sieciami i wolumenami.",
      "Wielokontenerowy stos CMS z trwałym zapisem bazy danych i izolowaną siecią.",
      "Ćwiczenia backendowe z endpointami, strukturą aplikacji i logiką usług.",
      "Ćwiczenia bazodanowe z tabelami, relacjami, zapytaniami i podstawami analizy danych.",
    ],
  },
  en: {
    pageTitle: "Zbigniew Łamaszewski | IT Portfolio",
    metaDescription:
      "Personal IT portfolio of Zbigniew Łamaszewski: Linux, Docker, web development, networking, databases and certificates.",
    languageButton: "PL",
    languageLabel: "Change language to Polish",
    brand: "Zbigniew Łamaszewski",
    nav: ["About", "Skills", "Projects", "Certificates", "Contact"],
    heroEyebrow: "IT portfolio",
    heroName: "Zbigniew Łamaszewski",
    heroRole: "IT student / Junior IT / Docker, Linux, Web, Networking",
    heroText:
      "I build practical IT lab projects, learn modern infrastructure tools, and connect system administration with web development, APIs, databases and network fundamentals.",
    heroPrimary: "View projects",
    heroSecondary: "View certificates",
    aboutEyebrow: "About",
    aboutHeading: "Learning by building real IT environments.",
    aboutText:
      "I am developing my IT skills through hands-on work with Linux, Docker, networking, web development and databases. My focus is on understanding how services are deployed, connected, monitored and maintained, from Ubuntu servers and containers to APIs, SQL projects and responsive websites.",
    skillsEyebrow: "Skills",
    skillsHeading: "Technical stack",
    projectsEyebrow: "Projects",
    projectsHeading: "Infrastructure, web and database practice",
    certificatesEyebrow: "Certificates",
    certificatesHeading: "Course certificates",
    certificatesLead:
      "Browse the certificate coverflow, swipe on mobile, or open any certificate in fullscreen.",
    contactEyebrow: "Contact",
    contactHeading: "Let us connect",
    footer: "Ready for GitHub Pages, Docker or Nginx static hosting.",
    terminal: `$ docker ps
ubuntu-server     running
nginx-web         online
wordpress-db      healthy
portainer         active

$ skills --focus
linux docker networking web sql`,
    projectTitles: [
      "Docker server in VirtualBox with Ubuntu",
      "Nginx container",
      "Portainer dashboard",
      "WordPress + MariaDB in Docker",
      "Spring Boot API",
      "SQL project",
    ],
    projectTexts: [
      "Local server lab for practicing Linux administration, Docker setup and service deployment.",
      "Containerized web server configured for static hosting and reverse-proxy learning.",
      "Docker management interface for monitoring containers, images, networks and volumes.",
      "Multi-container CMS stack with persistent database storage and isolated networking.",
      "Backend API practice focused on endpoints, application structure and service logic.",
      "Database exercises with tables, relations, queries and data analysis fundamentals.",
    ],
  },
};

let currentLanguage = localStorage.getItem("portfolioLanguage") || "pl";
let currentTheme = localStorage.getItem("portfolioTheme") || "dark";
let terminalTimer = 0;
let typingTimer = 0;
let typingWordIndex = 0;
let typingCharIndex = 0;
let isDeletingTyping = false;

const typingWords = [
  "Junior IT",
  "Networking",
  "Java / Spring Boot",
  "SQL",
  "Python",
  "Docker",
  "Cisco Packet Tracer",
];

const contactCopy = {
  pl: {
    eyebrow: "Szybka wiadomość",
    title: "Wyślij krótką wiadomość rekrutacyjną",
    lead: "Wypełnij formularz, a program pocztowy otworzy gotową wiadomość do wysłania.",
    name: "Imię i nazwisko",
    email: "Email",
    message: "Wiadomość",
    submit: "Otwórz wiadomość email",
    status: "Otwieram gotową wiadomość email...",
    subject: "Kontakt rekrutacyjny z portfolio",
  },
  en: {
    eyebrow: "Quick message",
    title: "Send a short recruitment message",
    lead: "Fill in the form and your email client will open with a ready message.",
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Open email message",
    status: "Opening a ready email message...",
    subject: "Recruitment contact from portfolio",
  },
};

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
// Use image: "path.png" for one version, or image: { pl: "pl.png", en: "en.png" } for language-specific versions.
const certificates = [
  { pl: "Docker dla WebDevelopera", en: "Docker for Web Developers", image: "assets/certificates/cert-docker.png" },
  { pl: "HTML i CSS", en: "HTML and CSS", image: "assets/certificates/cert-html-css.png" },
  { pl: "Linux", en: "Linux", image: "assets/certificates/cert-linux.png" },
  { pl: "Tworzenie WWW od Podstaw", en: "Website Creation from Basics", image: "assets/certificates/cert-wordpress.png" },
  { pl: "ESLint i Prettier", en: "ESLint and Prettier", image: "assets/certificates/cert-javascript.png" },
  { pl: "HTTP i API", en: "HTTP and API", image: "assets/certificates/cert-api.png" },
  { pl: "Podstawy pracy z Cursor IDE", en: "Basics of Working with Cursor IDE", image: "assets/certificates/cert-cursor.png" },
  { pl: "Programowanie w Java", en: "Java Programming", image: "assets/certificates/cert-java.png" },
  { pl: "Mini CMS z Vue", en: "Mini CMS with Vue", image: "assets/certificates/cert-vue.png" },
  { pl: "Nowoczesny Webdesign", en: "Modern Web Design", image: "assets/certificates/cert-webdesign.png" },
  {
    pl: "Strony WWW z Jekyll i GitHub Pages",
    en: "Websites with Jekyll and GitHub Pages",
    image: "assets/certificates/cert-jekyll-github-pages.png",
  },
  { pl: "System Operacyjny w CSS cz.1", en: "Operating System in CSS, part 1", image: "assets/certificates/cert-css-os-1.png" },
  { pl: "System Operacyjny w CSS cz.2", en: "Operating System in CSS, part 2", image: "assets/certificates/cert-css-os-2.png" },
  {
    pl: "Techniki Tworzenia Nawigacji z HTML i CSS",
    en: "Navigation Techniques with HTML and CSS",
    image: "assets/certificates/cert-navigation-html-css.png",
  },
  { pl: "Testowanie Aplikacji w Symfony2", en: "Application Testing in Symfony2", image: "assets/certificates/cert-symfony-testing.png" },
  { pl: "Budowanie Marki Osobistej", en: "Building a Personal Brand", image: "assets/certificates/cert-personal-brand.png" },
  {
    pl: "Czy przyszłość to meta ludzie i wirtualni influencerzy",
    en: "Are Meta Humans and Virtual Influencers the Future",
    image: "assets/certificates/cert-virtual-influencers.png",
  },
  { pl: "Przydatne Funkcje Miro do Warsztatów z Klientem", en: "Useful Miro Features for Client Workshops", image: "assets/certificates/cert-miro.png" },
  {
    pl: "Podstawy Automatyki w Praktyce",
    en: "Industrial Automation in Practice",
    image: {
      pl: "assets/certificates/cert-automation-pl.png",
      en: "assets/certificates/cert-automation-en.png",
    },
  },
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

function certificateTitle(certificate) {
  return certificate[currentLanguage] || certificate.en || certificate.pl;
}

function certificateImage(certificate) {
  if (typeof certificate.image === "string") {
    return certificate.image;
  }

  return certificate.image[currentLanguage] || certificate.image.en || certificate.image.pl;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function typeTerminal(text) {
  if (!terminalCode) return;

  window.clearInterval(terminalTimer);
  terminalCode.textContent = "";
  terminalCode.classList.add("terminal-cursor");

  let index = 0;
  terminalTimer = window.setInterval(() => {
    terminalCode.textContent = text.slice(0, index);
    index += 1;

    if (index > text.length) {
      window.clearInterval(terminalTimer);
    }
  }, 12);
}

function applyContactLanguage(language) {
  const copy = contactCopy[language];
  setText("[data-contact-eyebrow]", copy.eyebrow);
  setText("[data-contact-title]", copy.title);
  setText("[data-contact-lead]", copy.lead);
  setText("[data-contact-name-label]", copy.name);
  setText("[data-contact-email-label]", copy.email);
  setText("[data-contact-message-label]", copy.message);
  setText("[data-contact-submit]", copy.submit);
}

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem("portfolioTheme", theme);
  document.body.classList.toggle("light-theme", theme === "light");
  themeToggle.textContent = theme === "light" ? "Dark" : "Light";
  themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
}

function applyLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("portfolioLanguage", language);

  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = copy.pageTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metaDescription);

  setText(".brand span:last-child", copy.brand);
  document.querySelectorAll(".nav-links a").forEach((link, index) => {
    link.textContent = copy.nav[index];
  });

  setText(".hero .eyebrow", copy.heroEyebrow);
  setText(".hero-content h1", copy.heroName);
  setText(".hero-role", copy.heroRole);
  setText(".hero-text", copy.heroText);
  setText(".hero-actions .button-primary", copy.heroPrimary);
  setText(".hero-actions .button-secondary", copy.heroSecondary);
  typeTerminal(copy.terminal);

  setText("#about .eyebrow", copy.aboutEyebrow);
  setText("#about h2", copy.aboutHeading);
  setText(".about-card p", copy.aboutText);
  setText("#skills .eyebrow", copy.skillsEyebrow);
  setText("#skills h2", copy.skillsHeading);
  setText("#projects .eyebrow", copy.projectsEyebrow);
  setText("#projects h2", copy.projectsHeading);
  setText("#certificates .eyebrow", copy.certificatesEyebrow);
  setText("#certificates h2", copy.certificatesHeading);
  setText("#certificates .section-lead", copy.certificatesLead);
  setText("#contact .eyebrow", copy.contactEyebrow);
  setText("#contact h2", copy.contactHeading);
  setText(".site-footer p", copy.footer);

  document.querySelectorAll(".project-card").forEach((card, index) => {
    const title = card.querySelector("h3");
    const text = card.querySelector("p");
    if (title) title.textContent = copy.projectTitles[index];
    if (text) text.textContent = copy.projectTexts[index];
  });

  languageToggle.textContent = copy.languageButton;
  languageToggle.setAttribute("aria-label", copy.languageLabel);
  languageToggle.setAttribute("aria-pressed", language === "en" ? "true" : "false");

  applyContactLanguage(language);
  renderCarousel();
}

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
    const title = certificateTitle(certificate);
    card.dataset.shortTitle = title;
    card.setAttribute("aria-label", `${currentLanguage === "pl" ? "Otwórz certyfikat" : "Open certificate"}: ${title}`);

    const image = document.createElement("img");
    image.src = certificateImage(certificate);
    image.alt = title;
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
    dot.setAttribute("aria-label", `${currentLanguage === "pl" ? "Pokaż certyfikat" : "Show certificate"} ${index + 1}`);
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

  caption.textContent = `${activeIndex + 1} / ${certificates.length} - ${certificateTitle(certificates[activeIndex])}`;
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
  const title = certificateTitle(certificate);
  lightboxImage.src = certificateImage(certificate);
  lightboxImage.alt = title;
  lightboxCaption.textContent = title;
}

prevButton.addEventListener("click", showPrevious);
nextButton.addEventListener("click", showNext);
lightboxPrev.addEventListener("click", showPrevious);
lightboxNext.addEventListener("click", showNext);
lightboxClose.addEventListener("click", closeLightbox);
languageToggle.addEventListener("click", () => {
  applyLanguage(currentLanguage === "pl" ? "en" : "pl");
});

themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    projectCards.forEach((card) => {
      const technologies = card.dataset.tech || "";
      card.classList.toggle("is-hidden", filter !== "all" && !technologies.includes(filter));
    });
  });
});

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

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const copy = contactCopy[currentLanguage];
  const name = document.querySelector("#contactName").value.trim();
  const email = document.querySelector("#contactEmail").value.trim();
  const message = document.querySelector("#contactMessage").value.trim();
  const body = [
    `${copy.name}: ${name}`,
    `${copy.email}: ${email}`,
    "",
    message,
  ].join("\n");

  const mailtoUrl = `mailto:lamaszewski.zl@gmail.com?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = copy.status;
  window.location.href = mailtoUrl;
});

function initHeroNetwork() {
  if (!heroCanvas) return;

  const context = heroCanvas.getContext("2d");
  const pointer = { x: 0, y: 0, active: false };
  let particles = [];
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    const rect = heroCanvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    heroCanvas.width = width * ratio;
    heroCanvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.max(34, Math.min(78, Math.floor(width / 18)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.8,
    }));
  }

  function drawLine(a, b, distance, maxDistance) {
    const opacity = Math.max(0, 1 - distance / maxDistance) * 0.32;
    context.strokeStyle = `rgba(55, 216, 255, ${opacity})`;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
  }

  function animate() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      context.fillStyle = "rgba(124, 247, 200, 0.78)";
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();

      for (let i = index + 1; i < particles.length; i += 1) {
        const other = particles[i];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance < 125) drawLine(particle, other, distance, 125);
      }

      if (pointer.active) {
        const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);
        if (pointerDistance < 180) {
          drawLine(particle, pointer, pointerDistance, 180);
        }
      }
    });

    requestAnimationFrame(animate);
  }

  heroCanvas.addEventListener("pointermove", (event) => {
    const rect = heroCanvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  });

  heroCanvas.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animate();
}

function initSpotlight() {
  const setSpotlight = (x, y) => {
    document.body.style.setProperty("--spotlight-x", `${x}px`);
    document.body.style.setProperty("--spotlight-y", `${y}px`);
  };

  window.addEventListener("pointermove", (event) => {
    setSpotlight(event.clientX, event.clientY);
  });
}

function initTiltCards() {
  const cards = document.querySelectorAll(".glass-card");

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-x", `${y * -7}deg`);
      card.style.setProperty("--tilt-y", `${x * 7}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-tilting");
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function initTypingEffect() {
  if (!typingText) return;

  window.clearTimeout(typingTimer);

  const word = typingWords[typingWordIndex];
  const current = word.slice(0, typingCharIndex);
  typingText.textContent = current;

  if (!isDeletingTyping && typingCharIndex < word.length) {
    typingCharIndex += 1;
    typingTimer = window.setTimeout(initTypingEffect, 80);
    return;
  }

  if (!isDeletingTyping && typingCharIndex === word.length) {
    isDeletingTyping = true;
    typingTimer = window.setTimeout(initTypingEffect, 1150);
    return;
  }

  if (isDeletingTyping && typingCharIndex > 0) {
    typingCharIndex -= 1;
    typingTimer = window.setTimeout(initTypingEffect, 42);
    return;
  }

  isDeletingTyping = false;
  typingWordIndex = (typingWordIndex + 1) % typingWords.length;
  typingTimer = window.setTimeout(initTypingEffect, 220);
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll(".section, .project-card, .skill-card, .timeline-item, .skill-progress");

  revealItems.forEach((item) => item.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        if (entry.target.classList.contains("skill-progress")) {
          const progress = entry.target.dataset.progress || "0";
          entry.target.style.setProperty("--progress", `${progress}%`);
          entry.target.classList.add("is-filled");
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

progressCards.forEach((card) => {
  card.style.setProperty("--progress", "0%");
});

initHeroNetwork();
initSpotlight();
initTiltCards();
initTypingEffect();
initRevealAnimations();
applyTheme(currentTheme);
applyLanguage(currentLanguage);

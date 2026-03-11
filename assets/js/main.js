const initSite = () => {
  if (document.body.dataset.siteInitialized === "true") return;
  document.body.dataset.siteInitialized = "true";

  /*=============== SHOW MENU ===============*/
  const showMenu = (navId, toggleId) => {
    const nav = document.getElementById(navId),
      toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  };
  showMenu("nav-menu", "nav-toggle");

  /*=============== REMOVE MENU MOBILE ===============*/
  const navLink = document.querySelectorAll(".nav__link");

  const linkAction = () => {
    const navMenu = document.getElementById("nav-menu");
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show-menu");
  };
  navLink.forEach((n) => n.addEventListener("click", linkAction));

  /*=============== ADD SHADOW HEADER ===============*/
  const shadowHeader = () => {
    const header = document.getElementById("header");
    // Add a class if the bottom offset is greater than 50 of the viewport
    window.scrollY >= 50
      ? header.classList.add("shadow-header")
      : header.classList.remove("shadow-header");
  };
  window.addEventListener("scroll", shadowHeader);

  /*=============== SHOW SCROLL UP ===============*/
  const scrollUp = () => {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    window.scrollY >= 350
      ? scrollUp.classList.add("show-scroll")
      : scrollUp.classList.remove("show-scroll");
  };
  window.addEventListener("scroll", scrollUp);

  /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
  const sections = document.querySelectorAll("section[id]");

  const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute("id"),
        sectionsClass = document.querySelector(
          ".nav__menu a[href*=" + sectionId + "]",
        );

      if (!sectionsClass) return;

      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        sectionsClass.classList.add("active-link");
      } else {
        sectionsClass.classList.remove("active-link");
      }
    });
  };
  window.addEventListener("scroll", scrollActive);

  /*=============== DARK LIGHT THEME ===============*/
  const themeButton = document.getElementById("theme-button");
  const themeRoot = document.documentElement;
  const darkTheme = "dark-theme";
  const iconTheme = "ri-sun-fill";
  const themeStorageKey = "selected-theme";

  const applyTheme = (theme) => {
    const isDark = theme !== "light";
    themeRoot.classList.toggle(darkTheme, isDark);
    themeButton.classList.toggle(iconTheme, isDark);
  };

  // Default to dark mode unless the user previously chose light mode.
  applyTheme(localStorage.getItem(themeStorageKey) || "dark");

  themeButton.addEventListener("click", () => {
    const nextTheme = themeRoot.classList.contains(darkTheme)
      ? "light"
      : "dark";

    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });

  /*=============== SCROLL REVEAL ANIMATION ===============*/
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2000,
    // reset: true, // Animations repeat
  });

  sr.reveal(`.home__title, .home__description, .home__data .button`, {
    interval: 100,
  });
  sr.reveal(`.home__image`, { delay: 900 });
  sr.reveal(`.home__phone`, { origin: "left", delay: 1500 });
  sr.reveal(`.home__comment`, { origin: "right", delay: 1800 });
  sr.reveal(`.home__social`, { origin: "bottom", delay: 2100 });

  sr.reveal(`.service__card, .service__title, .service__description`, {
    interval: 100,
  });

  sr.reveal(`.menu__card`, { interval: 100 });

  sr.reveal(
    `.app .section__subtitle, .app .section__title, .app__description, .app .button`,
    { interval: 100 },
  );
  sr.reveal(`.app__image`, { origin: "bottom", delay: 900 });

  sr.reveal(`.map__area`, { origin: "right" });
  sr.reveal(`.map__card`, { origin: "left", delay: 600 });

  const mapArea = document.querySelector(".map__area");

  if (mapArea) {
    const mapRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          mapArea.classList.add("map__area--revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.35,
      },
    );

    mapRevealObserver.observe(mapArea);
  }

  sr.reveal(`.footer__data, .footer__content div`, { interval: 100 });

  /*=============== AUTO COPYRIGHT YEAR UPDATE ===============*/
  document.getElementById("copyright-year").innerHTML =
    new Date().getFullYear();
};

initSite();

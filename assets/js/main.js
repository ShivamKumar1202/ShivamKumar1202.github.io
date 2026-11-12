/* =========================================================
   MAIN — interactions. Vanilla JS, no dependencies.

   Theme model
   -----------
   data-theme      : editorial | paper | kinetic
   data-theme-mode : dark | light

   Visitors get a dark/light toggle that defaults to their
   system preference and is remembered afterwards.
   With ?dev=1 the full theme picker appears.
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var STORE_THEME = "site:theme";
  var STORE_MODE = "site:mode";

  var THEMES = ["editorial", "paper", "kinetic"];

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  /* =========================================================
     THEME
     ========================================================= */
  var devMode = new URLSearchParams(window.location.search).get("dev") === "1";
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme, mode) {
    if (THEMES.indexOf(theme) === -1) theme = "editorial";
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-theme-mode", mode);
    root.style.colorScheme = mode;
  }

  function initTheme() {
    var theme = safeGet(STORE_THEME);
    if (THEMES.indexOf(theme) === -1) theme = "editorial";

    /* Explicit choice wins; otherwise follow the OS. */
    var storedMode = safeGet(STORE_MODE);
    var mode =
      storedMode === "dark" || storedMode === "light"
        ? storedMode
        : systemDark.matches
          ? "dark"
          : "light";

    applyTheme(theme, mode);
    return { theme: theme, mode: mode };
  }

  var current = initTheme();

  /* Follow the OS while the visitor hasn't chosen explicitly. */
  if (systemDark.addEventListener) {
    systemDark.addEventListener("change", function (e) {
      if (safeGet(STORE_MODE)) return;
      current.mode = e.matches ? "dark" : "light";
      applyTheme(current.theme, current.mode);
    });
  }

  /* ---------- visitor dark/light toggle ---------- */
  var modeToggle = document.getElementById("theme-toggle");
  if (modeToggle) {
    modeToggle.hidden = false;
    modeToggle.addEventListener("click", function () {
      current.mode = current.mode === "dark" ? "light" : "dark";
      applyTheme(current.theme, current.mode);
      safeSet(STORE_MODE, current.mode);
      modeToggle.setAttribute(
        "aria-label",
        current.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  /* ---------- dev theme picker ---------- */
  if (devMode) {
    var picker = document.createElement("div");
    picker.className = "dev-themes";
    picker.innerHTML = '<span class="dev-themes__label">theme</span>';

    THEMES.forEach(function (theme) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = theme;
      btn.setAttribute("aria-pressed", String(theme === current.theme));
      btn.addEventListener("click", function () {
        current.theme = theme;
        applyTheme(theme, current.mode);
        safeSet(STORE_THEME, theme);
        picker.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
      });
      picker.appendChild(btn);
    });

    document.body.appendChild(picker);
  }

  /* =========================================================
     NAV: stuck state + reading progress
     ========================================================= */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress-fill");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-stuck", y > 24);

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0).toFixed(2) + "%";
    }
    updateActiveLink();
  }

  /* =========================================================
     MOBILE MENU
     ========================================================= */
  var menuToggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var scrim = document.getElementById("nav-scrim");

  function setMenu(open) {
    if (!menuToggle || !menu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    if (scrim) scrim.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });
    if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuToggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024) setMenu(false);
    });
  }

  /* =========================================================
     SCROLL SPY
     ========================================================= */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav__links a[href^='#'], .footer__nav a[href^='#']")
  );
  var sectionIds = ["about", "resume", "projects", "publications", "contact"];

  function updateActiveLink() {
    var probe = (window.scrollY || 0) + window.innerHeight * 0.32;
    var currentId = "";

    sectionIds.forEach(function (id) {
      var node = document.getElementById(id);
      if (node && node.offsetTop <= probe) currentId = id;
    });

    navLinks.forEach(function (link) {
      var isCurrent = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("is-active", isCurrent);
      if (link.closest(".nav__links")) {
        if (isCurrent) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
    });
  }

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (n) { n.classList.add("is-visible"); });
  } else {
    root.classList.add("anim");
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (n) { revealObserver.observe(n); });
  }

  /* =========================================================
     COUNTERS
     ========================================================= */
  function animateCount(node) {
    var target = parseInt(node.dataset.count, 10) || 0;
    var suffix = node.dataset.suffix || "";

    if (reduceMotion) {
      node.textContent = target + suffix;
      return;
    }

    var duration = 1500;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

    if ("IntersectionObserver" in window && !reduceMotion) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (n) { observer.observe(n); });
    } else {
      counters.forEach(function (n) {
        n.textContent = n.dataset.count + (n.dataset.suffix || "");
      });
    }
  }

  /* =========================================================
     TYPED ROLE
     ========================================================= */
  function initTyping() {
    var node = document.getElementById("typed-role");
    if (!node) return;

    var roles = (window.SITE && window.SITE.profile.roles) || [];
    if (!roles.length) return;

    var prefix = document.querySelector(".hero__role-prefix");

    /* "an Engineer", "a Developer" — the article depends on the word. */
    function article(word) {
      return /^[aeiou]/i.test(word) ? "an" : "a";
    }

    function showPrefix(word) {
      if (prefix) prefix.textContent = article(word) + "\u00a0";
    }

    showPrefix(roles[0]);
    node.textContent = roles[0];
    if (reduceMotion || roles.length === 1) return;

    var roleIndex = 0;
    var charIndex = roles[0].length;
    var deleting = false;

    function tick() {
      var word = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        node.textContent = word.slice(0, charIndex);
        if (charIndex >= word.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 85);
      } else {
        charIndex--;
        node.textContent = word.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          showPrefix(roles[roleIndex]);
          setTimeout(tick, 260);
          return;
        }
        setTimeout(tick, 42);
      }
    }
    setTimeout(tick, 1900);
  }

  /* =========================================================
     HERO SPOTLIGHT
     ========================================================= */
  function initSpotlight() {
    var spotlight = document.getElementById("spotlight");
    var hero = document.querySelector(".hero");
    if (!spotlight || !hero || reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    hero.addEventListener("mousemove", function (event) {
      var rect = hero.getBoundingClientRect();
      spotlight.style.setProperty("--mx", event.clientX - rect.left + "px");
      spotlight.style.setProperty("--my", event.clientY - rect.top + "px");
    });
  }

  /* =========================================================
     ANCHOR SCROLL WITH NAV OFFSET
     ========================================================= */
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href^='#']");
    if (!link) return;

    var hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    var target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    var offset = -((nav ? nav.offsetHeight : 0) + 12);
    var top = target.getBoundingClientRect().top + window.scrollY + offset;

    window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", hash);
  });

  /* =========================================================
     BOOT
     ========================================================= */
  function afterRender() {
    initCounters();
    initTyping();

    /* reveal elements created by the renderer need observing too */
    if (!reduceMotion && "IntersectionObserver" in window) {
      var late = Array.prototype.slice.call(document.querySelectorAll(".reveal:not(.is-visible)"));
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      late.forEach(function (n) { obs.observe(n); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (n) {
        n.classList.add("is-visible");
      });
    }

    onScroll();
  }

  if (root.dataset.rendered === "true") afterRender();
  else window.addEventListener("site:rendered", afterRender);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
  onScroll();
})();

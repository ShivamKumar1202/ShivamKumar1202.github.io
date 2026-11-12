/* =========================================================
   RENDER — turns data/content.js into DOM.

   Inline formatting supported in every string:
     **bold**   *italic*   `mono`   [label](https://url)

   All text is HTML-escaped BEFORE formatting is applied, so
   content can never inject markup.
   ========================================================= */
(function () {
  "use strict";

  var SITE = window.SITE;
  if (!SITE) return;

  /* ---------------- escaping ---------------- */
  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------------- inline formatting ---------------- */
  // Order matters: links first (they contain text), then mono, bold, italic.
  var LINK = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+|#[^\s)]*)\)/g;
  var MONO = /`([^`]+)`/g;
  var BOLD = /\*\*([^*]+)\*\*/g;
  var ITAL = /(^|[^*])\*([^*\n]+)\*(?!\*)/g;

  function inline(text) {
    var out = esc(text);

    out = out.replace(LINK, function (_, label, href) {
      var external = /^https?:/.test(href);
      return (
        '<a href="' + href + '"' +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") +
        ">" + label + "</a>"
      );
    });
    out = out.replace(MONO, "<code>$1</code>");
    out = out.replace(BOLD, "<strong>$1</strong>");
    out = out.replace(ITAL, "$1<em>$2</em>");
    return out;
  }

  /* ---------------- tiny DOM helpers ---------------- */
  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function icon(id) {
    return '<svg class="icon" aria-hidden="true"><use href="#i-' + id + '"/></svg>';
  }

  function mount(id, children) {
    var host = document.getElementById(id);
    if (!host) return;
    host.textContent = "";
    children.forEach(function (c) { if (c) host.appendChild(c); });
  }

  function visible(list) {
    return (list || []).filter(function (item) { return !item.hidden; });
  }

  /* =========================================================
     NAV / FOOTER statics
     ========================================================= */
  function renderBrand() {
    document.querySelectorAll("[data-brand-mark]").forEach(function (n) {
      n.textContent = SITE.profile.initials;
    });
    document.querySelectorAll("[data-brand-name]").forEach(function (n) {
      n.textContent = SITE.profile.name;
    });
    document.querySelectorAll("[data-brand-role]").forEach(function (n) {
      n.textContent = SITE.profile.headline + " — " + SITE.profile.location;
    });

    var status = document.querySelector("[data-hero-status]");
    if (status) {
      status.textContent = "";
      status.appendChild(el("span", "hero__status-dot"));
      status.appendChild(el("span", null, esc(SITE.profile.status)));
    }

    document.querySelectorAll("[data-resume-link]").forEach(function (a) {
      a.href = SITE.resume.file;
      a.setAttribute("download", "");
      if (SITE.resume.updated) a.title = "Updated " + SITE.resume.updated;
    });
    document.querySelectorAll("[data-resume-label]").forEach(function (n) {
      n.textContent = SITE.resume.label;
    });
    document.querySelectorAll("[data-form-link]").forEach(function (a) {
      a.href = SITE.links.form;
    });
    document.querySelectorAll("[data-demo-link]").forEach(function (a) {
      a.href = SITE.links.demoVideos;
    });

    var lede = document.querySelector("[data-hero-lede]");
    if (lede) lede.textContent = SITE.profile.summary;
  }

  /* =========================================================
     TRAJECTORY
     ========================================================= */
  function renderTrajectory() {
    var items = SITE.trajectory.map(function (t) {
      var li = el("li", "trajectory__item");
      li.appendChild(el("span", "trajectory__year", esc(t.year)));
      li.appendChild(el("span", "trajectory__label", esc(t.label)));
      return li;
    });
    mount("trajectory-list", items);
  }

  /* =========================================================
     ABOUT — facts, prose, skill bars, skill groups
     ========================================================= */
  function renderAbout() {
    var facts = [
      ["Name", SITE.profile.name],
      ["Job Role", SITE.profile.headline],
      ["Profile", "RPA Developer"],
      ["Education", "M.Tech CSE (pursuing)"],
      ["Address", SITE.profile.location],
      ["Language", "English, Hindi"],
      ["Interest", "Chess, Gaming, Teaching"]
    ];

    mount(
      "about-facts",
      facts.map(function (pair) {
        var row = el("div");
        row.appendChild(el("dt", null, esc(pair[0])));
        row.appendChild(el("dd", null, esc(pair[1])));
        return row;
      })
    );

    /* skill bars */
    mount(
      "skill-bars",
      SITE.skills.bars.map(function (bar) {
        var wrap = el("div", "skill-bar");
        var top = el("div", "skill-bar__top");
        top.appendChild(el("span", null, esc(bar.label)));
        top.appendChild(el("span", "skill-bar__value", bar.value + "%"));
        var meter = el("div", "meter");
        meter.setAttribute("role", "img");
        meter.setAttribute("aria-label", bar.label + " — " + bar.value + " percent");
        var fill = el("span", "meter__fill");
        fill.style.setProperty("--val", bar.value + "%");
        meter.appendChild(fill);
        wrap.appendChild(top);
        wrap.appendChild(meter);
        return wrap;
      })
    );

    /* skill groups */
    mount(
      "skill-groups",
      SITE.skills.groups.map(function (group) {
        var wrap = el("div", "skill-group");
        wrap.appendChild(el("p", "skill-group__name", esc(group.name)));
        var ul = el("ul", "chips");
        group.items.forEach(function (item) {
          ul.appendChild(el("li", null, esc(item)));
        });
        wrap.appendChild(ul);
        return wrap;
      })
    );
  }

  /* =========================================================
     EXPERIENCE
     ========================================================= */
  function renderExperience() {
    var items = visible(SITE.experience).map(function (job) {
      var li = el("li", "timeline__item");
      li.appendChild(el("span", "timeline__dot"));

      var card = el("div", "timeline__card");

      var top = el("div", "timeline__top");
      top.appendChild(el("h3", "timeline__role", esc(job.role)));

      var period = [job.start, job.end].filter(Boolean).join(" — ");
      if (period) top.appendChild(el("span", "timeline__period", esc(period)));
      card.appendChild(top);

      var org = el("p", "timeline__org", esc(job.org));
      if (job.location) {
        org.appendChild(el("span", "timeline__where", " · " + esc(job.location)));
      }
      card.appendChild(org);

      if (job.points && job.points.length) {
        var ul = el("ul", "bullets");
        job.points.forEach(function (point) {
          ul.appendChild(el("li", null, inline(point)));
        });
        card.appendChild(ul);
      }

      li.appendChild(card);
      return li;
    });
    mount("timeline", items);
  }

  /* =========================================================
     EDUCATION
     ========================================================= */
  function renderEducation() {
    var cards = SITE.education.map(function (edu) {
      var card = el("article", "edu-card");

      if (edu.current) card.classList.add("is-current");
      card.appendChild(el("span", "edu-card__period", esc(edu.period)));
      card.appendChild(el("h4", "edu-card__degree", esc(edu.degree)));

      var school = el("p", "edu-card__school", esc(edu.school));
      if (edu.location) {
        school.appendChild(el("span", "timeline__where", " · " + esc(edu.location)));
      }
      card.appendChild(school);

      if (edu.grade) card.appendChild(el("p", "edu-card__grade", esc(edu.grade)));
      return card;
    });
    mount("edu-grid", cards);
  }

  /* =========================================================
     PROJECTS
     ========================================================= */
  function renderProjects() {
    var projects = visible(SITE.projects);

    /* filters */
    var categories = ["All"];
    projects.forEach(function (p) {
      if (p.category && categories.indexOf(p.category) === -1) categories.push(p.category);
    });

    var bar = document.getElementById("project-filters");
    if (bar) {
      bar.textContent = "";
      categories.forEach(function (cat, i) {
        var btn = el("button", "filter", esc(cat));
        btn.type = "button";
        btn.setAttribute("aria-pressed", i === 0 ? "true" : "false");
        btn.dataset.category = cat;
        bar.appendChild(btn);
      });
    }

    /* cards */
    var cards = projects.map(function (project, index) {
      var article = el("article", "project");
      article.dataset.category = project.category || "";
      article.style.setProperty("--i", index);

      var primary = (project.links && project.links[0]) || null;

      var media = el("a", "project__media");
      media.href = primary ? primary.href : "#";
      if (primary && /^https?:/.test(primary.href)) {
        media.target = "_blank";
        media.rel = "noopener noreferrer";
      }
      media.setAttribute("aria-label", "Open " + project.title);

      var img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title + " preview";
      img.loading = "lazy";
      img.decoding = "async";
      media.appendChild(img);

      media.appendChild(el("span", "project__year", esc(project.year || "")));
      media.appendChild(
        el("span", "project__open", icon("arrow"))
      );
      article.appendChild(media);

      var body = el("div", "project__body");
      var title = el("h3", "project__title");
      if (primary) {
        var titleLink = el("a", null, esc(project.title));
        titleLink.href = primary.href;
        if (/^https?:/.test(primary.href)) {
          titleLink.target = "_blank";
          titleLink.rel = "noopener noreferrer";
        }
        title.appendChild(titleLink);
      } else {
        title.textContent = project.title;
      }
      body.appendChild(title);

      body.appendChild(el("p", "project__desc", inline(project.description)));

      if (project.tech && project.tech.length) {
        var tags = el("ul", "project__tags");
        project.tech.forEach(function (t) { tags.appendChild(el("li", null, esc(t))); });
        body.appendChild(tags);
      }

      if (project.links && project.links.length) {
        var links = el("div", "project__links");
        project.links.forEach(function (link) {
          var a = el("a", "project__link", esc(link.label) + icon("arrow"));
          a.href = link.href;
          if (/^https?:/.test(link.href)) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
          }
          links.appendChild(a);
        });
        body.appendChild(links);
      }

      article.appendChild(body);
      return article;
    });
    mount("project-grid", cards);
  }

  /* =========================================================
     PUBLICATIONS
     ========================================================= */
  function renderPublications() {
    var cards = SITE.publications.map(function (pub) {
      var article = el("article", "pub");
      article.appendChild(el("p", "pub__venue", esc(pub.venue)));
      article.appendChild(el("h3", "pub__title", esc(pub.title)));
      article.appendChild(el("p", "pub__desc", inline(pub.description)));

      if (pub.tags && pub.tags.length) {
        var tags = el("ul", "pub__tags");
        pub.tags.forEach(function (t) { tags.appendChild(el("li", null, esc(t))); });
        article.appendChild(tags);
      }

      if (pub.link) {
        var wrap = el("div", "pub__link");
        var a = el("a", "project__link", esc(pub.link.label) + icon("arrow"));
        a.href = pub.link.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        wrap.appendChild(a);
        article.appendChild(wrap);
      }
      return article;
    });
    mount("pub-grid", cards);
  }

  /* =========================================================
     ACHIEVEMENTS + STATS
     ========================================================= */
  function renderAchievements() {
    var cards = SITE.achievements.map(function (item) {
      var card = el("article", "ach");
      card.appendChild(el("h3", "ach__title", esc(item.title)));
      card.appendChild(el("p", "ach__detail", inline(item.detail)));
      if (item.meta) card.appendChild(el("p", "ach__meta", esc(item.meta)));
      return card;
    });
    mount("ach-grid", cards);
  }

  function renderStats() {
    mount(
      "stats-inner",
      SITE.stats.map(function (stat) {
        var wrap = el("div", "stat");
        var num = el("span", "stat__num");
        num.dataset.count = stat.value;
        num.dataset.suffix = stat.suffix || "";
        num.textContent = "0";
        wrap.appendChild(num);
        wrap.appendChild(el("span", "stat__label", esc(stat.label)));
        return wrap;
      })
    );
  }

  /* =========================================================
     CONTACT
     ========================================================= */
  function renderContact() {
    var data = [
      {
        icon: "pin",
        label: "Address",
        value: "Patna, India",
        href: "https://www.google.com/maps/place/Patna,+Bihar,+India",
        external: true
      },
      {
        icon: "phone",
        label: "Contact Number",
        value: SITE.profile.phone,
        href: SITE.profile.phoneHref,
        external: false
      },
      {
        icon: "mail",
        label: "Email Address",
        value: SITE.profile.email,
        href: "mailto:" + SITE.profile.email,
        external: false
      },
      {
        icon: "file",
        label: "Download Resume",
        value: "View / download PDF",
        href: SITE.resume.file,
        external: false,
        download: true
      }
    ];

    mount(
      "contact-grid",
      data.map(function (item) {
        var a = el("a", "contact-card");
        a.href = item.href;
        if (item.external) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        if (item.download) a.setAttribute("download", "");
        a.appendChild(el("span", "contact-card__icon", icon(item.icon)));
        a.appendChild(el("span", "contact-card__label", esc(item.label)));
        a.appendChild(el("span", "contact-card__value", esc(item.value)));
        return a;
      })
    );

    mount(
      "socials",
      [
        ["linkedin", SITE.links.linkedin, "LinkedIn"],
        ["facebook", SITE.links.facebook, "Facebook"],
        ["instagram", SITE.links.instagram, "Instagram"],
        ["github", SITE.links.github, "GitHub"]
      ].map(function (s) {
        var a = el("a");
        a.href = s[1];
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", s[2]);
        a.innerHTML = icon(s[0]);
        return a;
      })
    );
  }

  /* =========================================================
     PROJECT FILTER BEHAVIOUR
     ========================================================= */
  function wireFilters() {
    var bar = document.getElementById("project-filters");
    var grid = document.getElementById("project-grid");
    if (!bar || !grid) return;

    bar.addEventListener("click", function (event) {
      var btn = event.target.closest(".filter");
      if (!btn) return;

      bar.querySelectorAll(".filter").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      var category = btn.dataset.category;
      grid.querySelectorAll(".project").forEach(function (card) {
        var match = category === "All" || card.dataset.category === category;
        card.hidden = !match;
      });
    });
  }

  /* ---------------- boot ---------------- */
  function boot() {
    renderBrand();
    renderTrajectory();
    renderAbout();
    renderExperience();
    renderEducation();
    renderProjects();
    renderPublications();
    renderAchievements();
    renderStats();
    renderContact();
    wireFilters();

    document.documentElement.dataset.rendered = "true";
    window.dispatchEvent(new CustomEvent("site:rendered"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

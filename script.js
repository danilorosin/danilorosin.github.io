// Header colour on scroll, mobile menu, collapsible publications and site search.
(function () {
  var body = document.body;
  var header = document.querySelector(".site-header");
  var banner = document.querySelector(".banner");

  /* ---- Header: turns solid once the banner has mostly scrolled away ---- */
  function onScroll() {
    var limit = banner ? banner.offsetHeight / 2 : 0;
    header.classList.toggle("solid", window.scrollY > limit);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".menu-toggle");
  var scrim = document.querySelector(".nav-scrim");
  function setNav(open) {
    body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle) toggle.addEventListener("click", function () { setNav(!body.classList.contains("nav-open")); });
  if (scrim) scrim.addEventListener("click", function () { setNav(false); });

  /* ---- Collapsible publications ---- */
  document.querySelectorAll(".pub").forEach(function (pub) {
    var head = pub.querySelector(".pub-head");
    var btn = pub.querySelector(".pub-toggle");
    function flip() {
      var open = pub.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    head.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; // links open normally
      flip();
    });
  });

  /* ---- Site search ---- */
  var PAGES = [
    { url: "index.html", title: "About me" },
    { url: "cv.html", title: "CV" },
    { url: "publications.html", title: "Publications" }
  ];
  var openBtn = document.querySelector(".search-btn");
  var bar = document.querySelector(".search-bar");
  var input = bar.querySelector("input");
  var closeBtn = bar.querySelector(".search-close");
  var clearBtn = bar.querySelector(".search-clear");
  var results = document.querySelector(".search-results");
  var index = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return Promise.all(PAGES.map(function (p) {
      return fetch(p.url).then(function (r) { return r.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var main = doc.querySelector("main");
        var text = (main ? main.textContent : "").replace(/\s+/g, " ").trim();
        return { url: p.url, title: p.title, text: text };
      }).catch(function () {
        // Opened from disk (file://): fall back to the current page only
        if (location.pathname.split("/").pop() === p.url || (p.url === "index.html" && /\/$/.test(location.pathname))) {
          return { url: p.url, title: p.title, text: document.querySelector("main").textContent.replace(/\s+/g, " ").trim() };
        }
        return { url: p.url, title: p.title, text: "" };
      });
    })).then(function (list) { index = list; return list; });
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function render(q) {
    q = q.trim();
    results.classList.toggle("has-query", q.length > 0);
    if (!q) { results.innerHTML = ""; return; }
    loadIndex().then(function (list) {
      var words = q.toLowerCase().split(/\s+/).filter(Boolean);
      var hits = list.filter(function (p) {
        var t = (p.title + " " + p.text).toLowerCase();
        return words.every(function (w) { return t.indexOf(w) !== -1; });
      });
      var re = new RegExp("(" + words.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi");
      var html = '<p class="count">' + (hits.length ? hits.length + (hits.length === 1 ? " result" : " results") : "No results for “" + esc(q) + "”") + "</p>";
      hits.forEach(function (p) {
        var low = p.text.toLowerCase();
        var at = low.indexOf(words[0]);
        var start = Math.max(0, at - 80);
        if (start > 0) { var sp = p.text.indexOf(" ", start); if (sp !== -1 && sp < at) start = sp + 1; }
        var end = Math.min(p.text.length, start + 220);
        if (end < p.text.length) { var sp2 = p.text.lastIndexOf(" ", end); if (sp2 > at) end = sp2; }
        var snippet = (start > 0 ? "… " : "") + p.text.slice(start, end) + (end < p.text.length ? " …" : "");
        html += '<a class="result" href="' + p.url + '"><div class="result-title">' + esc(p.title) +
          '</div><div class="result-snippet">' + esc(snippet).replace(re, "<mark>$1</mark>") + "</div></a>";
      });
      results.innerHTML = html;
    });
  }

  function openSearch() {
    body.classList.add("search-open");
    setNav(false);
    input.focus();
    loadIndex();
  }
  function closeSearch() {
    body.classList.remove("search-open");
    input.value = "";
    render("");
  }

  openBtn.addEventListener("click", openSearch);
  closeBtn.addEventListener("click", closeSearch);
  clearBtn.addEventListener("click", function () { input.value = ""; render(""); input.focus(); });
  input.addEventListener("input", function () { render(input.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeSearch(); setNav(false); }
  });
})();

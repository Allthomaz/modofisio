/* ============================================================
   MODO FISIO — interações (vanilla JS)
   reveal • scroll-progress • header scrolled • smooth-scroll + spy
   voltar ao topo • menu mobile • marquee de depoimentos
   ============================================================ */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal on scroll (com stagger de grupo) ---------- */
  function setupReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      var step = parseInt(group.getAttribute("data-reveal-group"), 10) || 70;
      group.querySelectorAll("[data-reveal]").forEach(function (el, i) {
        el.style.transitionDelay = i * step + "ms";
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Scroll: progresso + header + topo + spy (1 rAF) ---------- */
  function setupScroll() {
    var header = document.querySelector(".mf-header");
    var root = document.documentElement;
    var toTop = document.querySelector(".mf-scroll-top");
    var fab = document.querySelector(".fab-wa");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.mf-nav a[href^="#"]'));
    var sections = navLinks
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);
    var ticking = false;

    function update() {
      var sy = window.scrollY || root.scrollTop;
      var h = root.scrollHeight - window.innerHeight;
      var p = h > 0 ? sy / h : 0;
      root.style.setProperty("--mf-scroll-progress", Math.min(1, Math.max(0, p)).toFixed(4));
      if (header) header.classList.toggle("is-scrolled", sy > 14);
      if (toTop) {
        var show = sy > 600;
        toTop.classList.toggle("is-visible", show);
        if (fab) fab.classList.toggle("raised", show);
      }
      if (sections.length) {
        var mid = sy + window.innerHeight * 0.35;
        var cur = sections[0];
        for (var i = 0; i < sections.length; i++) { if (sections[i].offsetTop <= mid) cur = sections[i]; }
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + cur.id);
        });
      }
      ticking = false;
    }
    function onScroll() { if (!ticking) { requestAnimationFrame(update); ticking = true; } }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    if (toTop) toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Smooth scroll âncoras ---------- */
  function setupAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (!id || id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
        closeMenu();
      });
    });
  }

  /* ---------- Menu mobile ---------- */
  var navEl, toggleEl;
  function closeMenu() {
    if (navEl && navEl.classList.contains("is-open")) {
      navEl.classList.remove("is-open");
      if (toggleEl) toggleEl.setAttribute("aria-expanded", "false");
    }
  }
  function setupMenu() {
    toggleEl = document.querySelector(".mf-menu-toggle");
    navEl = document.querySelector(".mf-nav");
    if (!toggleEl || !navEl) return;
    toggleEl.addEventListener("click", function () {
      var open = navEl.classList.toggle("is-open");
      toggleEl.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Marquee de depoimentos: duplica + anima só quando visível ---------- */
  function setupMarquee() {
    var tracks = document.querySelectorAll(".mf-rvw-track");
    if (!tracks.length) return;
    if (!prefersReduced) {
      tracks.forEach(function (t) { t.innerHTML += t.innerHTML; }); /* duplica para o loop (-50%) */
    }
    var wall = document.querySelector(".mf-rvw-wall");
    if (!wall || !("IntersectionObserver" in window)) {
      tracks.forEach(function (t) { t.style.animationPlayState = prefersReduced ? "paused" : "running"; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var play = e.isIntersecting && !prefersReduced ? "running" : "paused";
        e.target.querySelectorAll(".mf-rvw-track").forEach(function (t) { t.style.animationPlayState = play; });
      });
    }, { threshold: 0.04 });
    io.observe(wall);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupReveal();
    setupScroll();
    setupAnchors();
    setupMenu();
    setupMarquee();
  });
})();

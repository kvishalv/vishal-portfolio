/* Vishal Kannankara — portfolio interactions. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navtoggle");
  var links = document.getElementById("navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- active section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navLinks.forEach(function (a) {
              a.style.color = a.getAttribute("href") === "#" + id ? "var(--accent-ink)" : "";
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll (progressive enhancement) ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".card, .belief, .job, .project, .creds");
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var revealer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    targets.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- headshot fallback to monogram ---------- */
  var shot = document.getElementById("headshot");
  if (shot) {
    var fail = function () { shot.setAttribute("data-broken", ""); };
    shot.addEventListener("error", fail);
    if (shot.complete && shot.naturalWidth === 0) fail();
  }

  /* ---------- interactive terminal ---------- */
  var form = document.getElementById("term-form");
  var input = document.getElementById("term-input");
  var body = document.getElementById("term-body");
  var termBox = document.getElementById("term");

  var COMMANDS = {
    help: "Available commands: summary  engineering  reliability  experience  contact  clear",
    summary:
      "Vishal Kannankara — AI & platform engineering leader.\n" +
      "20+ years building payments, reliability, and applied-LLM systems.\n" +
      "I architect it, write the code that matters, run the incident, and lead the team that owns it.",
    engineering:
      "I build platforms engineers actually want to build on:\n" +
      "event-driven microservices, idempotency, zero-downtime migrations,\n" +
      "and LLM agents doing real investigative work in production.",
    reliability:
      "Reliability is a culture, not a feature.\n" +
      "SLOs, distributed tracing, circuit breakers, retry budgets, chaos\n" +
      "engineering — baked in before the first incident, not after the third.",
    experience:
      "Recharge    2022-2025  Eng Leader  · payments $1B+/mo · 200+ eng\n" +
      "Nua/Lagom   2021-2022  Director    · Go microservices · -50% infra\n" +
      "TorchFi     2019-2021  Head of Eng · food-tech platform 0->1\n" +
      "Wayfair     2018-2019  Eng Leader  · checkout latency -40%",
    contact:
      "email     kvishalv@gmail.com\n" +
      "linkedin  linkedin.com/in/kvishalv\n" +
      "github    github.com/kvishalv\n" +
      "substack  substack.com/@kvishalv"
  };

  function addLine(text, cls) {
    var p = document.createElement("p");
    p.className = cls || "term__out";
    p.textContent = text;
    body.appendChild(p);
  }

  function run(raw) {
    var cmd = (raw || "").trim().toLowerCase();
    var echo = document.createElement("p");
    echo.className = "term__line";
    echo.innerHTML = '<span class="term__prompt">$</span> ' + escapeHtml(raw);
    body.appendChild(echo);

    if (!cmd) { /* nothing */ }
    else if (cmd === "clear") { body.innerHTML = ""; }
    else if (COMMANDS[cmd]) { addLine(COMMANDS[cmd]); }
    else { addLine("command not found: " + cmd + " — try 'help'", "term__out term__dim"); }

    body.scrollTop = body.scrollHeight;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  if (form && input && body) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      run(input.value);
      input.value = "";
    });
    if (termBox) {
      termBox.addEventListener("click", function (e) {
        if (!e.target.closest("a")) input.focus();
      });
    }
  }
})();

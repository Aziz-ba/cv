// ---------- year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- dark/light theme toggle ----------
const themeBtn = document.createElement("button");
themeBtn.id = "theme-toggle";
themeBtn.className = "theme-toggle";
themeBtn.setAttribute("aria-label", "Toggle theme");

const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const storedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let currentTheme = storedTheme || (prefersLight ? "light" : "dark");

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.innerHTML = theme === "light" ? moonIcon : sunIcon;
}

const themeStyle = document.createElement("style");
themeStyle.textContent = `
  body, .nav, .nav.scrolled, .skill-card, .proj, .facts li, .links, .chips span, footer, .btn {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }
  [data-theme="light"] {
    --bg: #f8fafc;
    --bg2: #f1f5f9;
    --surface: #ffffff;
    --surface2: #f1f5f9;
    --text: #0f172a;
    --muted: #475569;
    --accent: #0284c7;
    --accent2: #0d9488;
    --line: #e2e8f0;
  }
  .theme-toggle {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--text);
    border-radius: 8px;
    padding: 5px 9px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
    transition: border-color 0.2s, color 0.2s, transform 0.2s;
  }
  .theme-toggle:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: scale(1.05);
  }
`;
document.head.appendChild(themeStyle);

const navLinks = document.querySelector(".links");
if (navLinks) {
  navLinks.appendChild(themeBtn);
}
applyTheme(currentTheme);

themeBtn.addEventListener("click", () => {
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

// ---------- nav scroll + burger ----------
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40));
const burger = document.getElementById("burger");
const links = document.querySelector(".links");
burger.addEventListener("click", () => { links.classList.toggle("open"); burger.classList.toggle("x"); });
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { links.classList.remove("open"); burger.classList.remove("x"); }));

// ---------- typed role ----------
const EN = document.documentElement.lang === "en";
const roles = EN
  ? ["Data & Analytics Engineer", "Snowflake · dbt · Power BI", "Data Engineer & AI"]
  : ["Ingénieur Data & Analytics", "Snowflake · dbt · Power BI", "Data Engineer & AI"];
const typed = document.getElementById("typed");
let ri = 0, ci = 0, del = false;
(function type() {
  const w = roles[ri];
  typed.textContent = w.slice(0, ci);
  if (!del && ci < w.length) ci++;
  else if (del && ci > 0) ci--;
  else if (!del && ci === w.length) { del = true; return setTimeout(type, 1700); }
  else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 35 : 70);
})();

// ---------- reveal on scroll ----------
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ---------- projects ----------
const G = "https://github.com/Aziz-ba/";
const projects = [
  { ico: "🎬", name: EN ? "Movie Analytics — Fabric" : "Movie Analytics — Fabric", desc: EN ? "Medallion lakehouse and Power BI star schema." : "Lakehouse Medallion et star schema Power BI.", tags: ["Fabric", "PySpark", "Power BI"], url: G + "fabric-movie-analytics" },
  { ico: "🧊", name: EN ? "Data Lake on Snowflake" : "Data Lake sur Snowflake", desc: EN ? "GCS to Snowflake ingestion + Streamlit app." : "Ingestion GCS vers Snowflake + app Streamlit.", tags: ["Snowflake", "GCP", "Streamlit"], url: G + "data-lake-project" },
  { ico: "🎥", name: "IMDb Rating NLP", desc: EN ? "TF-IDF vs embeddings vs DistilBERT." : "TF-IDF vs embeddings vs DistilBERT.", tags: ["NLP", "PyTorch", "scikit-learn"], url: G + "imdb-rating-nlp" },
  { ico: "🏙️", name: "London Boroughs Data-viz", desc: EN ? "Scraping, cleaning and an interactive dashboard." : "Scraping, nettoyage et dashboard interactif.", tags: ["pandas", "Plotly", "Streamlit"], url: G + "london-boroughs-dataviz" },
  { ico: "🌡️", name: "IoT Sensor Telemetry", desc: EN ? "ESP32 to MQTT to InfluxDB to Grafana." : "ESP32 vers MQTT vers InfluxDB vers Grafana.", tags: ["ESP32", "MQTT", "InfluxDB"], url: G + "iot-sensor-telemetry" },
  { ico: "⚙️", name: "Infrastructure as Code", desc: EN ? "Reproducible AWS stack with Terraform." : "Stack AWS reproductible avec Terraform.", tags: ["Terraform", "Ansible", "AWS"], url: G + "infrastructure-as-code" },
  { ico: "🔌", name: "REST API — Node.js", desc: EN ? "JWT, tests, Swagger and Docker." : "JWT, tests, Swagger et Docker.", tags: ["Express", "JWT", "Docker"], url: G + "rest-api-nodejs" },
  { ico: "🚀", name: "CI/CD Pipeline", desc: EN ? "Jenkins to Docker to Kubernetes." : "Jenkins vers Docker vers Kubernetes.", tags: ["Jenkins", "Docker", "K8s"], url: G + "cicd-jenkins-docker" },
];
const grid = document.getElementById("projects-grid");
projects.forEach((p, i) => {
  const a = document.createElement("a");
  a.href = p.url; a.target = "_blank"; a.rel = "noopener";
  a.className = "proj reveal";
  a.style.transitionDelay = (i % 3) * 60 + "ms";
  a.innerHTML = `<div class="ico">${p.ico}</div><h4>${p.name}</h4><p>${p.desc}</p>
    <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>`;
  a.addEventListener("mousemove", (e) => {
    const r = a.getBoundingClientRect();
    a.style.setProperty("--mx", (e.clientX - r.left) + "px");
    a.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
  grid.appendChild(a);
  io.observe(a);
});

// ---------- animated data-network background ----------
const cv = document.getElementById("bg"), cx = cv.getContext("2d");
let W, H, pts, mouse = { x: -999, y: -999 };
function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; init(); }
function init() {
  const n = Math.min(90, Math.floor(W * H / 16000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
  }));
}
addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
addEventListener("mouseleave", () => { mouse.x = mouse.y = -999; });
function draw() {
  cx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
  }
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    for (let j = i + 1; j < pts.length; j++) {
      const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) {
        cx.strokeStyle = `rgba(41,181,232,${(1 - d / 130) * .22})`;
        cx.lineWidth = 1;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      }
    }
    const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
    if (dm < 160) {
      cx.strokeStyle = `rgba(94,234,212,${(1 - dm / 160) * .4})`;
      cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mouse.x, mouse.y); cx.stroke();
    }
    cx.fillStyle = "rgba(41,181,232,.8)";
    cx.beginPath(); cx.arc(a.x, a.y, 1.8, 0, 7); cx.fill();
  }
  requestAnimationFrame(draw);
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) { resize(); addEventListener("resize", resize); draw(); }
else { cv.style.display = "none"; }

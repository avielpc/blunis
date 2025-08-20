/* ==========================================
   BLUNIS Front-End Logic (Vanilla JS)
   ========================================== */

// === Settings ===
// WhatsApp: יש להשתמש בפורמט בינלאומי ללא פלוס וללא 0 בתחילת המספר המקומי.
const WHATSAPP_NUMBER = "972522780677"; // 052-2780677 → 972522780677
const CONTACT_EMAIL = "aviel@avielpc.com";
const WA_PREFIX = "שלום, הגעתי מאתר BLUNIS ורוצה להתקדם:";

// Testimonials
const testimonials = [
  { initials: "AB", name: "אורן, חנות ציוד", text: "“תוך חודשיים ירידה של 12% בהוצאות מלאי — מעולה.”" },
  { initials: "CD", name: "שיר, סטודיו לעיצוב", text: "“הבוט של BLUNIS נתן לנו דחיפה להצעות מחיר מדויקות.”" },
  { initials: "EF", name: "תומר, מסעדה", text: "“קיבלנו התראות על חריגות — חסך כאבי ראש וכסף.”" }
];

document.addEventListener("DOMContentLoaded", () => {
  initTheme();          // ברירת מחדל: Light, ניתן להחליף ל-Dark בלחיצה
  bindHeader();
  bindMobileMenu();
  bindAnimateOnScroll();
  bindFAQ();
  bindContactForm();
  initTestimonials();
  document.getElementById("year").textContent = new Date().getFullYear();
});

// === Theme (Light default, toggle to Dark) ===
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("blunis-theme");
  // אם אין שמור — פתיחה כברירת מחדל ב-Light (קיימת מחלקה על ה-HTML)
  if (saved === "dark") {
    root.classList.remove("light");
  }
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    // אם בהיר — הפוך לכהה; אם כהה — הפוך לבהיר
    const isLight = root.classList.contains("light");
    if (isLight) root.classList.remove("light"); else root.classList.add("light");
    localStorage.setItem("blunis-theme", isLight ? "dark" : "light");
  });
}

// === Active nav link on scroll ===
function bindHeader() {
  const links = [...document.querySelectorAll("header nav a")];
  const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = "#" + e.target.id;
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
      }
    });
  }, { rootMargin: "-35% 0px -60% 0px", threshold: 0.1 });

  sections.forEach(sec => obs.observe(sec));
}

// === Mobile menu ===
function bindMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
}

// === Animate on scroll ===
function bindAnimateOnScroll() {
  const els = document.querySelectorAll("[data-animate]");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// === FAQ accordion ===
function bindFAQ() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
    });
  });
}

// === Contact form: WhatsApp + Email ===
function bindContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const btnWA = document.getElementById("sendWA");
  const btnEmail = document.getElementById("sendEmail");

  // הכנת טקסט משותף
  function buildMessage() {
    const data = Object.fromEntries(new FormData(form).entries());
    return `${WA_PREFIX}
שם: ${data.name || ""}
אימייל: ${data.email || ""}
טלפון: ${data.phone || ""}
חבילה מועדפת: ${data.plan || "Basic"}
הודעה: ${data.message || ""}`;
  }

  // שליחה ל-WhatsApp על Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = buildMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // שליחה במייל (mailto) בלחיצה על הכפתור הייעודי
  btnEmail?.addEventListener("click", () => {
    const text = buildMessage();
    const subject = "פניה מאתר BLUNIS";
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = mailto;
  });
}

// === Testimonials carousel (simple) ===
function initTestimonials() {
  const wrap = document.getElementById("testiWrap");
  if (!wrap) return;

  let i = 0;
  function render() {
    const t = testimonials[i % testimonials.length];
    wrap.innerHTML = `
      <div class="testimonial">
        <div class="avatar">${t.initials}</div>
        <div>
          <strong>${t.name}</strong>
          <p class="muted">${t.text}</p>
        </div>
      </div>
    `;
    i++;
  }
  render();
  setInterval(render, 5000);
}

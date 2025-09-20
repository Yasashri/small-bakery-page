// Mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const expanded = () => navToggle.getAttribute("aria-expanded") === "true";

navToggle?.addEventListener("click", () => {
  const isOpen = expanded();
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.style.display = isOpen ? "none" : "flex";
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// On-scroll reveal animations
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("is-visible"));
}

// Lightweight “Add” button feedback (no cart backend yet)
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.item || "Item";
    btn.textContent = "Added ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add";
      btn.disabled = false;
    }, 1200);
  });
});

// Simple client-side “send request” UX
const form = document.querySelector(".contact-form");
const msg = document.querySelector(".form-msg");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();

  if (!name || !email) {
    msg.textContent = "Please fill in your name and email.";
    return;
  }

  // Replace with your backend/email service later:
  msg.textContent = "Thanks! We received your request and will get back soon.";
  form.reset();
});

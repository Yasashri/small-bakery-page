// Product data (expand as needed)
const products = [
  {
    name: "Classic Sourdough",
    desc: "Naturally leavened, slow-fermented loaf with a crackly crust and open crumb.",
    price: "$6.50",
    img: "/images/classic.png",
  },
  {
    name: "Butter Croissant",
    desc: "Laminated dough, crisp layers, deep buttery aroma. A morning essential.",
    price: "$2.20",
    img: "/images/croissants.png",
  },
  {
    name: "Chocolate Celebration Cake",
    desc: "Rich cocoa sponge, silky ganache. Sizes for every occasion.",
    price: "$28.00",
    img: "/images/cake.jpg",
  },
  {
    name: "Seasonal Fruit Tartlet",
    desc: "Vanilla custard, buttery shell, topped with peak-season fruit.",
    price: "$3.80",
    img: "/images/fruit.png",
  },
  // Add more products as needed
  {
    name: "Cinnamon Roll",
    desc: "Soft roll with cinnamon sugar swirl and vanilla glaze.",
    price: "$2.80",
    img: "/images/cinnamon.png",
  },
  {
    name: "Whole Wheat Loaf",
    desc: "Hearty, wholesome, and perfect for sandwiches.",
    price: "$5.00",
    img: "/images/wheat.png",
  },
  {
    name: "Lemon Drizzle Cake",
    desc: "Moist sponge with zesty lemon syrup and icing.",
    price: "$14.00",
    img: "/images/drizzle.png",
  },
  {
    name: "Mini Quiche",
    desc: "Savory tart with eggs, cheese, and seasonal veggies.",
    price: "$3.20",
    img: "/images/mini.png",
  },
];

function renderProducts() {
  const grid = document.getElementById("all-products-grid");
  grid.innerHTML = products
    .map(
      (p) => `
      <article class="card reveal">
        <div class="card-media">
          <img src="${p.img}" alt="${p.name}" />
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <p class="card-text">${p.desc}</p>
          <div class="card-meta">
            <span class="price">${p.price}</span>
            <button class="btn btn--sm add-to-cart" data-item="${p.name}">Add</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}
renderProducts();

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal animation (copied from script.js)
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

// Mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const expanded = () => navToggle.getAttribute("aria-expanded") === "true";
navToggle?.addEventListener("click", () => {
  const isOpen = expanded();
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.style.display = isOpen ? "none" : "flex";
});

// Add-to-cart feedback
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    btn.textContent = "Added ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add";
      btn.disabled = false;
    }, 1200);
  }
});
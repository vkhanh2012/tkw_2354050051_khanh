export function initNav() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!header || !toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", () => setOpen(false));
}

export function initHeaderOnScroll() {
  const header = document.querySelector("[data-site-header]");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle("shadow-sm", !entry.isIntersecting);
  });
  observer.observe(sentinel);
}

export function initToTop() {
  const button = document.querySelector("[data-to-top]");
  if (!button) return;

  const sentinel = document.getElementById("nav-sentinel");
  if (sentinel && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => {
      button.classList.toggle("hidden", entry.isIntersecting);
    });
    observer.observe(sentinel);
  }
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

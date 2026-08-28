export function initSlider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;
  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dots = root.querySelector("[data-slider-dots]");
  if (!track || slides.length === 0 || !dots) return;
  let index = 0;
  let timer;
  slides.forEach((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", `Hiện cảm nhận ${i + 1}`);
    dot.addEventListener("click", () => go(i));
    dots.append(dot);
  });
  const go = (next) => {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => slide.toggleAttribute("inert", i !== index));
    [...dots.children].forEach((dot, i) => dot.setAttribute("aria-current", String(i === index)));
  };
  const stop = () => clearInterval(timer);
  const start = () => { stop(); timer = setInterval(() => go(index + 1), 5000); };
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  go(0);
  start();
}

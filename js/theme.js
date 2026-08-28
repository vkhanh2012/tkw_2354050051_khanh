export function initTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  const update = (dark) => {
    document.documentElement.classList.toggle("dark", dark);
    toggle.setAttribute("aria-label", dark ? "Tắt chế độ tối" : "Bật chế độ tối");
    toggle.setAttribute("aria-pressed", String(dark));
  };
  update(document.documentElement.classList.contains("dark"));
  toggle.addEventListener("click", () => {
    const dark = !document.documentElement.classList.contains("dark");
    update(dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
}

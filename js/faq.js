export function initFaq() {
  const root = document.getElementById("faq");
  if (!root) return;
  const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
  const setOpen = (trigger, open) => {
    const answer = document.getElementById(trigger.getAttribute("aria-controls"));
    trigger.setAttribute("aria-expanded", String(open));
    answer?.classList.toggle("hidden", !open);
  };
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-faq-trigger]");
    if (!trigger) return;
    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((item) => setOpen(item, false));
    if (willOpen) setOpen(trigger, true);
  });
}

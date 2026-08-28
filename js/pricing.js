export function initPricing() {
  const root = document.querySelector("[data-pricing]");
  if (!root) return;
  const prices = [...root.querySelectorAll("[data-price]")];
  const toggle = root.querySelector('[role="switch"]');
  if (!toggle || prices.length === 0) return;
  const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
  const update = (yearly) => {
    toggle.setAttribute("aria-checked", String(yearly));
    toggle.textContent = yearly ? "Thanh toán năm" : "Thanh toán tháng";
    prices.forEach((price) => { price.textContent = currency.format(Number(price.dataset[yearly ? "yearly" : "monthly"])); });
  };
  update(toggle.getAttribute("aria-checked") === "true");
  toggle.addEventListener("click", () => update(toggle.getAttribute("aria-checked") !== "true"));
}

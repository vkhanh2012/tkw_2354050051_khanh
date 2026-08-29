import { initTheme } from "./theme.js";

const state = { records: [], query: "", category: "all", status: "all", sort: "date-desc", loading: true, error: null };
const storageKey = "hrmanager-records";
const statusLabels = { "da-chot": "Đã chốt", "cho-duyet": "Chờ duyệt", "tu-choi": "Từ chối" };
const sorters = { "date-desc": (a, b) => b.date.localeCompare(a.date), "date-asc": (a, b) => a.date.localeCompare(b.date), "amount-desc": (a, b) => b.amount - a.amount, "amount-asc": (a, b) => a.amount - b.amount, "weight-desc": (a, b) => b.weight - a.weight };
const elements = { list: document.querySelector("[data-records-list]"), message: document.querySelector("[data-status-message]"), query: document.querySelector("[data-query]"), category: document.querySelector("[data-category]"), status: document.querySelector("[data-status]"), sort: document.querySelector("[data-sort]"), form: document.querySelector("[data-record-form]"), restore: document.querySelector("[data-restore]") };

function visibleRecords() {
  const query = state.query.trim().toLowerCase();
  return state.records.filter((record) => state.category === "all" || record.category === state.category).filter((record) => state.status === "all" || record.status === state.status).filter((record) => !query || record.trader.toLowerCase().includes(query)).sort(sorters[state.sort]);
}
function formatNumber(value) { return new Intl.NumberFormat("vi-VN").format(value); }
function showMessage(text, className = "state-box") { const box = document.createElement("div"); box.className = className; box.textContent = text; elements.message.replaceChildren(box); }
function buildRow(record) {
  const row = document.getElementById("record-row-template").content.firstElementChild.cloneNode(true);
  row.dataset.id = record.id;
  row.querySelector('[data-cell="id"]').textContent = record.id;
  row.querySelector('[data-cell="trader"]').textContent = record.trader;
  row.querySelector('[data-cell="category"]').textContent = record.category;
  row.querySelector('[data-cell="weight"]').textContent = `${formatNumber(record.weight)} kg`;
  row.querySelector('[data-cell="amount"]').textContent = `${formatNumber(record.amount)} đ`;
  row.querySelector('[data-cell="date"]').textContent = new Date(`${record.date}T00:00:00`).toLocaleDateString("vi-VN");
  row.querySelector('[data-cell="status"]').textContent = statusLabels[record.status] || record.status;
  return row;
}
function render() {
  elements.list.replaceChildren();
  if (state.loading) return showMessage("Đang tải dữ liệu giao dịch...", "state-box");
  if (state.error) return showMessage(state.error, "state-box state-error");
  const records = visibleRecords();
  if (!records.length) return showMessage("Không tìm thấy phiếu cân phù hợp.");
  elements.message.replaceChildren(); elements.list.replaceChildren(...records.map(buildRow));
}
function saveRecords() { localStorage.setItem(storageKey, JSON.stringify(state.records)); }
async function loadRecords(forceSample = false) {
  if (!forceSample) { const saved = localStorage.getItem(storageKey); if (saved) return JSON.parse(saved); }
  const response = await fetch("./data/records.json");
  if (!response.ok) throw new Error(`Máy chủ trả về ${response.status}`);
  const records = await response.json(); saveRecords(); return records;
}
function debounce(callback, delay = 300) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => callback(...args), delay); }; }
async function reload(forceSample = false) {
  state.loading = true; state.error = null; render();
  try { state.records = await loadRecords(forceSample); } catch (error) { state.error = `Không tải được dữ liệu: ${error.message}`; } finally { state.loading = false; render(); }
}
function populateCategories() {
  [...new Set(state.records.map((record) => record.category))].sort().forEach((category) => { const option = document.createElement("option"); option.value = category; option.textContent = category; elements.category.append(option); });
}
elements.query.addEventListener("input", debounce((event) => { state.query = event.target.value; render(); }));
elements.category.addEventListener("change", (event) => { state.category = event.target.value; render(); });
elements.status.addEventListener("change", (event) => { state.status = event.target.value; render(); });
elements.sort.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
elements.list.addEventListener("click", (event) => { const button = event.target.closest("[data-delete]"); if (!button) return; state.records = state.records.filter((record) => record.id !== button.closest("tr").dataset.id); saveRecords(); render(); });
elements.form.addEventListener("submit", (event) => {
  event.preventDefault(); if (!elements.form.reportValidity()) return;
  const data = new FormData(elements.form);
  state.records = [{ id: data.get("id"), trader: data.get("trader"), category: data.get("category"), status: data.get("status"), weight: Number(data.get("weight")), amount: Number(data.get("amount")), date: data.get("date") }, ...state.records];
  saveRecords(); elements.form.reset(); render();
});
elements.restore.addEventListener("click", () => { localStorage.removeItem(storageKey); reload(true).then(populateCategories); });
initTheme(); render(); reload().then(populateCategories);
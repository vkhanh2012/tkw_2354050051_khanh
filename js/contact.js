export function initContact() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;
  form.setAttribute("novalidate", "");
  const summary = form.querySelector("[data-form-summary]");
  const fields = [...form.querySelectorAll("input, select, textarea")];

  function messageFor(field) {
    const validity = field.validity;
    if (validity.valueMissing) return "Vui lòng điền mục này.";
    if (validity.typeMismatch) return "Email chưa đúng dạng, ví dụ: chuvua@gmail.com";
    if (validity.patternMismatch) return "Nhập 10 chữ số, bắt đầu bằng 0. Ví dụ: 0912345678";
    if (validity.rangeUnderflow) return "Giá trị chưa đạt mức tối thiểu.";
    return "Thông tin chưa đúng, vui lòng kiểm tra lại.";
  }

  function validateField(field) {
    const error = document.getElementById(`${field.id}-error`);
    const invalid = !field.checkValidity();
    field.toggleAttribute("aria-invalid", invalid);
    if (error) { error.textContent = invalid ? messageFor(field) : ""; error.classList.toggle("hidden", !invalid); }
    return invalid;
  }

  fields.forEach((field) => field.addEventListener("blur", () => validateField(field)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = fields.filter(validateField);
    if (invalidFields.length) {
      summary.textContent = `Có ${invalidFields.length} mục cần sửa. Vui lòng kiểm tra các thông báo lỗi.`;
      summary.classList.remove("hidden");
      invalidFields[0].focus();
      return;
    }
    summary.textContent = "Đã nhận yêu cầu. Đội ngũ HRManager sẽ liên hệ với bạn sớm.";
    summary.classList.remove("hidden");
    form.reset();
  });
}
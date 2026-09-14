document.querySelectorAll("[data-app]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const app = form.dataset.app || "Sunny Days";
    const input = form.querySelector('input[type="email"]');
    const email = input.value.trim();
    const subject = encodeURIComponent(`${app} launch updates`);
    const body = encodeURIComponent(`Please add ${email} to the ${app} launch list.`);
    window.location.href = `mailto:support@sunny-days.fyi?subject=${subject}&body=${body}`;
  });
});

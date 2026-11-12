// Contact page: backend submission will be wired up later.
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent = "Thanks! Message sending is coming soon.";
    }
  });
}

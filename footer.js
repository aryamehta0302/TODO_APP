document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="w-full bg-gradient-to-r from-indigo-500 to-sky-400 dark:from-violet-500 dark:to-blue-500 text-white py-4 mt-auto">
      <div class="max-w-6xl mx-auto text-center text-sm">
        © <span id="year"></span> To-Do App • All Rights Reserved
      </div>
    </footer>
  `;

  document.getElementById("year").textContent = new Date().getFullYear();
});

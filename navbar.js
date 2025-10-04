document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  container.innerHTML = `
    <nav class="flex justify-between items-center px-6 py-4
                bg-gradient-to-r from-indigo-500 to-sky-400 
                dark:from-violet-500 dark:to-blue-500
                text-white shadow-lg">
      
      <!-- Logo -->
      <div class="flex items-center gap-2 cursor-pointer" id="homeLogo">
        <img src="logo.png" alt="Logo" class="w-8 h-8 rounded-md shadow-md shadow-indigo-500/40" />
      </div>

      <!-- Links -->
      <div class="flex items-center gap-6 text-sm sm:text-base">
        <a href="index.html" class="nav-link font-semibold">Home</a>
        <a href="profile.html" id="profileLink" class="nav-link font-semibold hidden">Profile</a>
        <a href="registration.html" id="signupLink" class="nav-link font-semibold">Sign Up</a>
        <a href="login.html" id="loginLink" class="nav-link font-semibold">Login</a>
        <a href="#" id="logoutLink" class="nav-link font-semibold hidden">Logout</a>

        <!-- Dark Mode Toggle -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input id="themeToggle" type="checkbox" class="hidden" />
          <div class="relative w-12 h-6 bg-white/40 rounded-full">
            <div id="knob" class="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform shadow"></div>
          </div>
        </label>
      </div>
    </nav>
  `;

  document.getElementById("homeLogo").onclick = () => (window.location.href = "index.html");

  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const knob = document.getElementById("knob");

  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    html.classList.add("dark");
    toggle.checked = true;
    knob.classList.add("translate-x-6");
  }

  toggle.addEventListener("change", () => {
    const dark = toggle.checked;
    localStorage.setItem("darkMode", dark);
    html.classList.toggle("dark", dark);
    knob.classList.toggle("translate-x-6", dark);
  });

  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const signup = document.getElementById("signupLink");
  const login = document.getElementById("loginLink");
  const logout = document.getElementById("logoutLink");
  const profile = document.getElementById("profileLink");

  if (loggedIn) {
    signup.classList.add("hidden");
    login.classList.add("hidden");
    logout.classList.remove("hidden");
    profile.classList.remove("hidden");
  }

  logout?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "false");
    alert("Logged out!");
    window.location.href = "index.html";
  });
});

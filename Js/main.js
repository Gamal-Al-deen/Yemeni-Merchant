document.addEventListener("DOMContentLoaded", () => {
  // 1) صورة الحساب
  const savedImage = localStorage.getItem("profileImage");
  const headerImg = document.querySelector(".nav-actions img.account-img");
  if (savedImage && headerImg) {
    headerImg.src = savedImage;
  }

  // 2) الوضع الليلي/النهاري
  const THEME_KEY = "app_theme";
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      updateThemeIcon(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      htmlEl.setAttribute("data-theme", "dark");
    } else {
      htmlEl.removeAttribute("data-theme");
    }
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.src = theme === "dark" ? "icon/sun.png" : "icon/moon.png";
    themeIcon.alt = theme === "dark" ? "الوضع النهاري" : "الوضع الليلي";
  }

  // 3) اللون الأساسي
  const PRIMARY_KEY = "app_primary_color";
  const colorPicker = document.getElementById("primaryColorPicker");

  const savedPrimary = localStorage.getItem(PRIMARY_KEY) || "#e66b19";
  document.documentElement.style.setProperty("--main-color", savedPrimary);
  if (colorPicker) colorPicker.value = savedPrimary;

  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      const color = e.target.value;
      document.documentElement.style.setProperty("--primary-color", color);
      localStorage.setItem(PRIMARY_KEY, color);
    });
  }
});



let backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

backToTopBtn.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};



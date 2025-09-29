document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("profileImageInput");
  const changeBtn = document.getElementById("changeProfileImageBtn");
  const avatarPreview = document.querySelector(".avatar-preview");

  const nameInput  = document.querySelector('input[placeholder="اسم المستخدم"]');
  const emailInput = document.querySelector('input[placeholder="jamal@email.com"]');
  const phoneInput = document.querySelector('input[placeholder="+967 7777777"]');
  const urlInput   = document.querySelector('input[placeholder="https://Jamal.com"]');
  const saveBtn    = document.querySelector(".form-actions .save-btn");

  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon      = document.getElementById("themeIcon");
  const colorPicker    = document.getElementById("primaryColorPicker");
  const resetBtn    = document.getElementById("resetColorsBtn");

  const headerImg = document.querySelector(".nav-actions img.account-img");

  const fields = [
    { key: "profileName", input: nameInput },
    { key: "profileEmail", input: emailInput },
    { key: "profilePhone", input: phoneInput },
    { key: "profileUrl", input: urlInput }
  ];

  fields.forEach(({ key, input }) => {
    const value = localStorage.getItem(key);
    if (value && input) input.value = value;
  });

  if (localStorage.getItem("profileImage") && avatarPreview) {
    avatarPreview.src = localStorage.getItem("profileImage");
    if (headerImg) headerImg.src = localStorage.getItem("profileImage");
  }

  if (changeBtn && fileInput) {
    changeBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        avatarPreview.src = imageData;
        localStorage.setItem("profileImage", imageData);
        if (headerImg) headerImg.src = imageData;
      };
      reader.readAsDataURL(file);
    });
  }

  const THEME_KEY = "app_theme";
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = current === "dark" ? "light" : "dark";
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
    if (theme === "dark") {
      themeIcon.src = "icon/sun.png";
      themeIcon.alt = "الوضع النهاري";
    } else {
      themeIcon.src = "icon/moon.png";
      themeIcon.alt = "الوضع الليلي";
    }
  }

 
  const PRIMARY_KEY = "app_primary_color";
  const savedPrimary =
    localStorage.getItem(PRIMARY_KEY) ||
    getComputedStyle(document.documentElement).getPropertyValue("--main-color") ;

  document.documentElement.style.setProperty("--main-color", savedPrimary);
  if (colorPicker) colorPicker.value = savedPrimary;

  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      const color = e.target.value;
      document.documentElement.style.setProperty("--main-color", color);
      localStorage.setItem(PRIMARY_KEY, color);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const defaultColor = "#e66b19";
      document.documentElement.style.setProperty("--main-color", defaultColor);
      localStorage.setItem(PRIMARY_KEY, defaultColor);
      if (colorPicker) colorPicker.value = defaultColor;
      
    });
  }
});

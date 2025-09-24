
const themeSelect = document.getElementById("theme");
const body = document.body;
const logo = document.getElementById("logo");

// Function to change theme
function changeTheme() {
  const selected = themeSelect.value;
}

  if (selected === "dark") {
    body.classList.add("dark");
    logo.src = "byui-logo_white.png"; 
  } else {
    body.classList.remove("dark");
    logo.src = "byui-logo.webp";        
}

// Event listener
themeSelect.addEventListener("change", changeTheme);

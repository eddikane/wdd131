const menuButton = document.querySelector(".menu");
const navMenu = document.querySelector("nav");
const BREAKPOINT = 1000;

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("hide");
  });
}

function handleResize() {
  if (window.innerWidth >= BREAKPOINT) {
    navMenu.classList.remove("hide");
  } else {
    navMenu.classList.add("hide");
  }
}

window.addEventListener("resize", handleResize);
document.addEventListener("DOMContentLoaded", handleResize);

const gallery = document.querySelector(".gallery");
const modal = document.createElement("dialog");
document.body.appendChild(modal);

function openViewer(event) {
  const clickedImage = event.target.closest("img");
  if (!clickedImage) return;

  const imgSrc = clickedImage.getAttribute("src");
  const imgAlt = clickedImage.getAttribute("alt");

  const largeSrc = imgSrc.split("-")[0] + "-full.jpeg";

  modal.innerHTML = `
    <div class="viewer-content">
      <button type="button" class="close-viewer" aria-label="Close image viewer">X</button>
      <img src="${largeSrc}" alt="${imgAlt}">
    </div>
  `;

  modal.showModal();
}

gallery.addEventListener("click", openViewer);

modal.addEventListener("click", (e) => {
  if (e.target.closest(".close-viewer")) {
    e.stopPropagation();
    modal.close();
    return;
  }

  const content = modal.querySelector(".viewer-content");
  if (content && !content.contains(e.target)) {
    modal.close();
  }
});

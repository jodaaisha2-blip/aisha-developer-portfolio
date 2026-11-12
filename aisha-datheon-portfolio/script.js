const root = document.documentElement;
const themeTrigger = document.getElementById("themeTrigger");
const themeMenu = document.getElementById("themeMenu");
const themeOptions = [...document.querySelectorAll("[data-theme-choice]")];
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function setTheme(theme) {
  if (!["midnight", "pearl", "sapphire"].includes(theme)) theme = "midnight";
  root.dataset.theme = theme;
  try { localStorage.setItem("aisha-portfolio-theme", theme); } catch (_) {}
  themeOptions.forEach(option => option.setAttribute("aria-checked", String(option.dataset.themeChoice === theme)));
}
try { setTheme(localStorage.getItem("aisha-portfolio-theme") || "midnight"); } catch (_) { setTheme("midnight"); }

themeTrigger.addEventListener("click", () => {
  const open = themeTrigger.getAttribute("aria-expanded") === "true";
  themeTrigger.setAttribute("aria-expanded", String(!open));
  themeMenu.hidden = open;
});
themeOptions.forEach(option => option.addEventListener("click", () => {
  setTheme(option.dataset.themeChoice);
  themeMenu.hidden = true;
  themeTrigger.setAttribute("aria-expanded", "false");
}));
document.addEventListener("click", event => {
  if (!event.target.closest(".theme-picker")) {
    themeMenu.hidden = true;
    themeTrigger.setAttribute("aria-expanded", "false");
  }
});
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal sections gently as they enter the viewport.
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Highlight the current section in the navigation.
const sections = [...document.querySelectorAll("main section[id]")];
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
  }
}), { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));

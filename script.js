/*
 * Demo-only client-side login for GitHub Pages.
 * IMPORTANT: This is not secure authentication. Credentials in JavaScript
 * can be viewed by visitors. Use a server/auth provider for private data.
 */
const SLP_USERNAME = "admin";
const SLP_PASSWORD = "Salim@#1992";
const SLP_SESSION_KEY = "slpLoggedIn";

function slpIsLoggedIn() {
  return sessionStorage.getItem(SLP_SESSION_KEY) === "yes";
}

function slpProtectPage() {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page === "login.html") return;
  if (!slpIsLoggedIn()) {
    const next = encodeURIComponent(location.pathname + location.search + location.hash);
    location.replace("login.html?next=" + next);
  }
}

function slpLogin() {
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value;
  const message = document.getElementById("loginMessage");

  if (username === SLP_USERNAME && password === SLP_PASSWORD) {
    sessionStorage.setItem(SLP_SESSION_KEY, "yes");
    const params = new URLSearchParams(location.search);
    let next = params.get("next") || "index.html";
    // Only allow local site paths.
    if (/^(https?:)?\/\//i.test(next) || next.startsWith("javascript:")) next = "index.html";
    location.href = next;
  } else if (message) {
    message.textContent = "Username অথবা Password ভুল হয়েছে। আবার চেষ্টা করুন।";
  }
}

function slpLogout() {
  sessionStorage.removeItem(SLP_SESSION_KEY);
  location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  slpProtectPage();
  document.querySelectorAll("[data-slp-logout]").forEach(button => {
    button.addEventListener("click", slpLogout);
  });
});

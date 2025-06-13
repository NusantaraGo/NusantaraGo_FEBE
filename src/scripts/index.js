// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // termasuk Popper.js

// bootstrap icon
import "bootstrap-icons/font/bootstrap-icons.css";

// icon fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";

// CSS imports
import "../styles/styles.css";

// pagination
import "paginationjs/dist/pagination.css";

import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
  });
  await app.renderPage();

  // Update navbar UI on initial load
  const userData = await checkUserAuth();
  updateNavbarUI(userData);

  // Add event listener for logout button
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      await logoutUser();
    });
  }

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
    // Update navbar UI on hash change
    const newUserData = await checkUserAuth();
    updateNavbarUI(newUserData);
  });
});

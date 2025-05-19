/**
 * Hide the navbar and footer
 *
 * This function will hide the navbar and footer so that it won't
 * appear on the login and register pages.
 */
export function hideNavbarAndFooter() {
  // footer
  const footer = document.querySelector("footer.bd-footer");
  footer.classList.add("d-none");

  // hapus navbar
  const navbar = document.querySelector("nav.navbar");
  navbar.classList.add("d-none");
}

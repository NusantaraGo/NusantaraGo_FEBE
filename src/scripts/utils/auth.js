export function hideNavbarAndFooter() {
  // footer
  const footer = document.querySelector("footer.bd-footer");
  footer.classList.add("d-none");

  // hapus navbar
  const navbar = document.querySelector("nav.navbar");
  navbar.classList.add("d-none");
}

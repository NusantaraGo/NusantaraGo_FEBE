import { getData } from "../data/api";

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
/**
 * Show the navbar and footer
 *
 * This function will show the navbar and footer so that it will
 * appear on all pages except the login and register pages.
 */
export function visibleNavbarAndFooter() {
  // footer
  const footer = document.querySelector("footer.bd-footer");
  footer.classList.remove("d-none");

  // hapus navbar
  const navbar = document.querySelector("nav.navbar");
  navbar.classList.remove("d-none");
}

/**
 * Checks if the user is authenticated by calling the backend API.
 * @returns {Promise<object | null>} The user data if authenticated, otherwise null.
 */
export async function checkUserAuth() {
  try {
    const response = await getData(undefined, undefined, "/auth/get-user");
    console.log("Response from /auth/get-user:", response);
    if (response && response.data) {
      return response.data; // Mengembalikan data pengguna jika berhasil
    }
    return null;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return null;
  }
}

/**
 * Updates the navbar UI based on the user's authentication status.
 * Shows 'Profile Saya' and 'Logout' links if authenticated, otherwise 'Daftar' and 'Masuk'.
 * @param {object | null} userData - The user data if authenticated, or null if not.
 */
export function updateNavbarUI(userData) {
  const authLinks = document.getElementById("auth-links");
  const userLinks = document.getElementById("user-links");

  if (userData) {
    if (authLinks) authLinks.classList.add("d-none");
    if (userLinks) {
      userLinks.classList.remove("d-none");
      // Anda bisa menambahkan logika untuk menampilkan nama pengguna di sini jika ada
      // const profileLink = userLinks.querySelector('a[href="#/profile"]');
      // if (profileLink) profileLink.textContent = userData.username || "Profile Saya";
    }
  } else {
    if (authLinks) authLinks.classList.remove("d-none");
    if (userLinks) userLinks.classList.add("d-none");
  }
}

/**
 * Handles user logout.
 */
export async function logoutUser() {
  try {
    await getData(undefined, undefined, "/auth/logout"); // Panggil endpoint logout di backend
    window.location.replace("#/"); // Redirect ke halaman utama setelah logout
    // Perbarui UI navbar setelah logout
    updateNavbarUI(null);
  } catch (error) {
    console.error("Logout failed:", error);
    // Handle error, misalnya tampilkan pesan kesalahan
  }
}

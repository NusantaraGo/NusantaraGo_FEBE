// swallfire
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export function showFormattedDate(date, locale = "en-US", options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

/**
 * Menunda eksekusi kode selama beberapa waktu (dalam milidetik)
 * @param {number} [time=1000] - Waktu yang diinginkan dalam milidetik
 * @returns {Promise} - Resolved setelah waktu yang diinginkan
 */
export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Menampilkan pesan menggunakan SweetAlert2.
 * @param {string} [icon="success"] - Icon yang ditampilkan.
 * @param {string} [title="OOPS!"] - Judul pesan.
 * @param {string} message - Isi pesan yang ditampilkan.
 */
function handlingMessage(icon = "success", title = "OOPS!", message) {
  Swal.fire({
    icon: icon,
    title: `${title}`,
    text: message,
  });
}

/**
 * Menampilkan pesan error menggunakan SweetAlert2.
 * @param {string} title - Judul pesan error.
 * @param {string} message - Isi pesan error yang ditampilkan.
 */
export const errorHandling = (title, message) => {
  handlingMessage("error", title, message);
};

/**
 * Menampilkan pesan sukses menggunakan SweetAlert2.
 * @param {string} title - Judul pesan sukses.
 * @param {string} message - Isi pesan sukses yang ditampilkan.
 */
export const successHandling = (title, message) => {
  handlingMessage("success", title, message);
};

/**
 * Membantu melakukan view transition
 * @param {object} param0
 * @param {boolean} [param0.skipTransition=false] - Jika true maka view transition diabaikan
 * @param {function} param0.updateDOM - Fungsi yang akan dijalankan setelah view transition
 * @returns {Promise} - Resolved setelah view transition selesai
 */
export function transitionHelper({ skipTransition = false, updateDOM }) {
  // jika tidak support startViewTransition
  if (skipTransition || !document.startViewTransition) {
    constupdateCallbackDone = Promise.resolve(updateDOM()).then(() => {});
    return {
      ready: Promise.reject(Error("view transition unsupported")), //kembalikan error not supported
      updateCallbackDone,
      finished: updateCallbackDone,
    };
  }
  return document.startViewTransition(updateDOM);
}

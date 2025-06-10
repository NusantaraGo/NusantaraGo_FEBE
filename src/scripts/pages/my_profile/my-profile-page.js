import { errorHandling, successHandling } from "../../utils";
import { visibleNavbarAndFooter } from "../../utils/auth";
const { togglePassword } = require("../../utils/my-profile");
import MyProfilePresenter from "./my-profile-presenter";

export default class myProfilePage {
  #presenterPage = null;
  /**
   * Render the My Profile page.
   *
   * @returns {string} The rendered HTML of the My Profile page.
   */
  async render() {
    return `
    <!--My Profile-->
    <section id='myProfile' class="container text-center text-lg-start" style='padding-top: 4rem;'>
    <div class='container d-flex justify-content-center align-items-center'>
      <div class="card card-custom text-center">
      <div class="profile-header"></div>
          <div class="profile-img">
              <img src="/images/user_default.svg"
                  alt="Profile" class="w-100 h-100 object-fit-cover">
          </div>
          <div class="card-body mt-3">
            <h5 id="nickname" class="card-title fw-bold text-dark mb-1">Fikri</h5>
            <div id="checkIcon" class="mb-1 d-none d-flex justify-content-center" style="max-height: 30px">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                <linearGradient id="SVGID_1__8tZkVc2cOjdg_gr1" x1="37.081" x2="10.918" y1="10.918" y2="37.081" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#60fea4"></stop><stop offset=".033" stop-color="#6afeaa"></stop><stop offset=".197" stop-color="#97fec4"></stop><stop offset=".362" stop-color="#bdffd9"></stop><stop offset=".525" stop-color="#daffea"></stop><stop offset=".687" stop-color="#eefff5"></stop><stop offset=".846" stop-color="#fbfffd"></stop><stop offset="1" stop-color="#fff"></stop></linearGradient><circle cx="24" cy="24" r="18.5" fill="url(#SVGID_1__8tZkVc2cOjdg_gr1)"></circle><path fill="none" stroke="#10e36c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M35.401,38.773C32.248,41.21,28.293,42.66,24,42.66C13.695,42.66,5.34,34.305,5.34,24	c0-2.648,0.551-5.167,1.546-7.448"></path><path fill="none" stroke="#10e36c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M12.077,9.646C15.31,6.957,19.466,5.34,24,5.34c10.305,0,18.66,8.354,18.66,18.66	c0,2.309-0.419,4.52-1.186,6.561"></path><polyline fill="none" stroke="#10e36c" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" points="16.5,23.5 21.5,28.5 32,18"></polyline>
              </svg>
            </div>
            <p id='createdAt' class="mb-4 text-muted">2025-03-12 17:05</p>
            <a id='logout' role='button' class="btn btn-danger mb-5">Logout</a>
              <form id="profileForm" class="text-start">
                  <!-- Username Field -->
                  <div class="mb-3">
                      <label for="username" class="form-label fw-semibold">
                          <i class="fas fa-user me-2"></i>Username
                      </label>
                      <div class="input-group">
                          <span class="input-group-text">
                              <i class="fas fa-user"></i>
                          </span>
                          <input type="text" class="form-control" id="username" name="username"
                              placeholder="Enter your username" required>
                      </div>
                  </div>

                  <!-- Email Field (Disabled/Readonly) -->
                  <div class="mb-3">
                      <label for="email" class="form-label fw-semibold">
                          <i class="fas fa-envelope me-2"></i>Email
                      </label>
                      <div class="input-group">
                          <span class="input-group-text">
                              <i class="fas fa-envelope"></i>
                          </span>
                          <input type="email" class="form-control" id="email" name="email" value="fikri@example.com"
                              readonly disabled>
                      </div>
                      <small class="text-muted">Email cannot be changed</small>
                  </div>

                  <!-- Password Field -->
                  <div class="mb-3">
                      <label for="password" class="form-label fw-semibold">
                          <i class="fas fa-lock me-2"></i>Password
                      </label>
                      <div class="input-group">
                          <span class="input-group-text">
                          <i class="fas fa-lock"></i>
                          </span>
                          <input type="password" class="form-control" id="password" name="password"
                              placeholder="Enter your password">
                          <span class="input-group-text password-toggle" data-field-id="password">
                              <i class="fas fa-eye" id="password-eye"></i>
                          </span>
                      </div>
                  </div>

                  <!-- Confirm Password Field -->
                  <div class="mb-4">
                      <label for="confirmPassword" class="form-label fw-semibold">
                          <i class="fas fa-lock me-2"></i>Confirm Password
                      </label>
                      <div class="input-group">
                          <span class="input-group-text">
                              <i class="fas fa-lock"></i>
                          </span>
                          <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                              placeholder="Confirm your password">
                          <span class="input-group-text password-toggle" data-field-id="confirmPassword">
                              <i class="fas fa-eye" id="confirmPassword-eye"></i>
                          </span>
                      </div>
                      <div class="invalid-feedback" id="passwordMismatch">
                          Passwords do not match!
                      </div>
                  </div>

                  <!-- Buttons -->
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="reset" class="btn btn-secondary-custom me-md-2">
                          <i class="fas fa-undo me-2"></i>Reset
                      </button>
                      <button type="submit" class="btn btn-primary-custom">
                          <i class="fas fa-check me-2"></i>Submit
                      </button>
                  </div>
              </form>
              <p class="mt-4">Waktu Terupdate: <span id="updatedAt" class="text-muted">17-05-2003 20:15</span></p>
          </div>
        </div>
      </div>
    </section>
    `;
  }

  /**
   * Format waktu dari ISO string menjadi waktu yang sesuai dengan
   * zona waktu Asia/Jakarta (WIB) dan dalam format yang sesuai
   * dengan kebutuhan tampilan.
   *
   * @param {string} isoDate ISO string yang akan di-format
   * @return {Promise<string>} Waktu yang telah di-format
   */
  async format_time_zone(isoDate) {
    const formatted = new Date(isoDate).toLocaleString("sv-SE", {
      timeZone: "Asia/Jakarta", // untuk WIB
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const cleanFormatted = formatted.replace(",", "").trim();
    return cleanFormatted;
  }

  /**
   * Inisialisasi halaman profil dengan data user yang tersedia di API.
   * Data yang diinisialisasi meliputi username, email, waktu pembuatan akun,
   * dan waktu terakhir update.
   *
   * @param {object} information_user - Objek yang berisi data user yang
   *   diambil dari API.
   * @return {Promise<void>}
   */
  async makeInisialisasi(information_user) {
    try {
      document.getElementById("nickname").textContent =
        information_user["username"];
      document.getElementById("username").value = information_user["username"];
      document.getElementById("email").value = information_user["email"];
      document.getElementById("createdAt").textContent =
        await this.format_time_zone(information_user["createdAt"]);
      document.getElementById("updatedAt").textContent =
        await this.format_time_zone(information_user["updatedAt"]);
      document.getElementById("checkIcon").classList.remove("d-none");
      return true;
    } catch (error) {
      if (error) {
        return false;
      }
    }
  }

  /**
   * Mendapatkan data user dari API.
   * @return {Promise<object>} - Data user yang diambil dari API.
   */
  async getUser() {
    this.#presenterPage = new MyProfilePresenter({ myProfilePage: this });
    return await this.#presenterPage.getUser();
  }

  /**
   * Menghandle proses logout dengan mengosongkan data akun yang ada di
   * LocalStorage dan mengarahkan ke halaman awal.
   * @return {Promise<void>}
   */
  async handleLogout() {
    this.#presenterPage = new MyProfilePresenter({ myProfilePage: this });
    return await this.#presenterPage.getLogout();
  }

  /**
   * Method yang dijalankan setelah elemen-elemen di halaman profil selesai
   * di-render. Method ini akan menginisialisasi halaman profil dengan data
   * user yang tersedia di API, serta membuat event listener untuk form
   * submission dan reset. Juga, method ini akan menginisialisasi event
   * listener untuk toggle password visibility dan membuat event listener
   * untuk real-time password matching validation.
   * @return {Promise<void>}
   */
  async afterRender() {
    // tampilkan navbar
    visibleNavbarAndFooter();

    // ambil user tokenize
    let response = await this.getUser();
    if (!response?.data) {
      return;
    }

    // jadikan data user saja
    const users = response.data;
    if (!users) {
      return;
    }

    try {
      // inisialisasi
      let isSuccess = await this.makeInisialisasi(users);
      if (!isSuccess) {
        throw new Error("Gagal mengambil data user.");
      }
    } catch (error) {
      if (error) {
        this.errorHandlerFetch(error.message);
      }
    }

    // password toogle
    document.querySelectorAll(".password-toggle").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", () => {
        const fieldId = toggleBtn.getAttribute("data-field-id");
        togglePassword(fieldId);
      });
    });

    // Form validation and submission
    document
      .getElementById("profileForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        /* The code is attempting to retrieve the values of the "username", "email", "password", and
          "confirmPassword" fields from an HTML form. However, there seems to be a syntax error in
          the code where the "document" object is not followed by a method or property to access the
          "confirmPassword" field. The code snippet provided is incomplete and needs to be corrected
          to properly access the form elements. */
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
          document.getElementById("confirmPassword").value;
        try {
          /* The above JavaScript code is checking if the variables `username` and `email` are falsy
            (empty, null, undefined, 0, false, NaN). If either `username` or `email` is falsy, it
            throws an error with the message "field username dan email wajib diisi." which means
            "username and email fields are mandatory." This code is enforcing the requirement that
            both `username` and `email` must be provided before proceeding with further execution. */
          if (!username || !email) {
            throw new Error("field username dan email wajib diisi.");
          }

          /* The above code is checking if the email address ends with "@gmail.com". If the email
            address does not end with "@gmail.com", it will throw an error with the message "email
            wajib menggunakan domain @gmail.com." This code is enforcing a requirement that the email
            address must use the domain "@gmail.com". */
          if (!email.endsWith("@gmail.com")) {
            throw Error("email wajib menggunakan domain @gmail.com.");
          }
        } catch (error) {
          await this.errorHandlerFetch(error);
          return;
        }

        // Reset previous validation states
        document
          .getElementById("confirmPassword")
          .classList.remove("is-invalid");

        // Check if passwords match
        if (password !== confirmPassword) {
          document
            .getElementById("confirmPassword")
            .classList.add("is-invalid");
          return;
        }

        // Here you would typically send the data to a server
        const datas = {
          username: username,
          email: email,
          password: password,
          password2: confirmPassword,
        };

        this.#presenterPage = new MyProfilePresenter({ myProfilePage: this });
        this.#presenterPage.sendDataToApi(datas);
      });

    // Real-time password matching validation
    document
      .getElementById("confirmPassword")
      .addEventListener("input", function () {
        const password = document.getElementById("password").value;
        const confirmPassword = this.value;

        if (confirmPassword && password !== confirmPassword) {
          this.classList.add("is-invalid");
        } else {
          this.classList.remove("is-invalid");
        }
      });

    // Reset form handler and reset password
    document
      .getElementById("profileForm")
      .addEventListener("reset", function () {
        document
          .getElementById("confirmPassword")
          .classList.remove("is-invalid");
        setTimeout(() => {
          // Reset password visibility
          document.getElementById("password").type = "password";
          document.getElementById("confirmPassword").type = "password";
          document
            .getElementById("password-eye")
            .classList.remove("fa-eye-slash");
          document.getElementById("password-eye").classList.add("fa-eye");
          document
            .getElementById("confirmPassword-eye")
            .classList.remove("fa-eye-slash");
          document
            .getElementById("confirmPassword-eye")
            .classList.add("fa-eye");
        }, 10);
      });

    // delete conformation
    document.getElementById("logout").addEventListener("click", async (e) => {
      e.preventDefault();
      this.handleLogout();
    });
  }

  /**
   * Handles errors that occur during data fetching operations.
   * If the error is a timeout error, it will display a "Timeout Error!"
   * message. If the error has a response, it will extract the error details
   * from the response and display an error message accordingly. If the error
   * is a 401 error, it will redirect the user to the login page.
   * @param {Error} error - The error object that was thrown.
   * @returns {Promise<void>}
   */
  async errorHandlerFetch(error) {
    if (error.code === "ECONNABORTED") {
      errorHandling(
        "Timeout Error!",
        "Terjadi kesalahan dalam pengiriman data. Mohon coba lagi."
      );
    } else {
      if (error.response) {
        // Ambil detail dari response Axios
        const errJson = {
          status: error.response.status,
          statusText: error.response.statusText,
          message: error.response.data.message,
          error: error.response.data.error,
        };
        if (errJson.status >= 400) {
          errorHandling(errJson.error, errJson.message);
          if (errJson.status === 401) {
            window.location.href = "#/login";
          }
        }
      } else {
        errorHandling("Error!", error.message);
      }
    }
  }

  /**
   * Handles successful responses from data fetching operations. This function
   * displays success messages to the user using a custom success handling
   * function if the response status code is between 200 and 400 and there is
   * no error.
   *
   * @param {{
   *   statusCode: number,
   *   message_title: string,
   *   detail_message: string,
   *   error: null,
   * }} params - The object containing response details.
   * @returns {Promise<void>}
   */
  async successHandlerFetch({
    statusCode,
    message_title,
    detail_message,
    error,
  }) {
    if (statusCode >= 200 && statusCode <= 400 && error === null) {
      return await successHandling(message_title, detail_message);
    }
  }
}

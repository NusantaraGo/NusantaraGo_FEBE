import { errorHandling } from "../../utils";
import { hideNavbarAndFooter } from "../../utils/auth";
import RegisterPresenter from "./register-presenter";
import { successHandling } from "../../utils";
export default class RegisterPage {
  #presenterPage = null;
  async render() {
    return `
      <section class="container text-center text-lg-start" style="padding-top: 8rem;
    width: 100vw;
    height: 50vw;">
        <div class="card mb-3 shadow p-3 bg-white rounded">
            <div class="row g-0">

                <!-- Form Section -->
                <div class="col-lg-6">
                    <div class="card-body py-3 px-md-5">
                        <div class="text-center mb-3">
                            <img src="images/logo.png" style="width: 185px;" alt="logo">
                        </div>
                        <form>
                            <h3 class="poppins-bold" style="color: #b57547;">Daftar Akun</h3>
                            <!-- Username input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="username">Username</label>
                                <input type="text" id="username" class="form-control" placeholder="Masukkan username" required>
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="email">Email</label>
                                <input type="email" id="email" class="form-control" placeholder="Masukkan email" required>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Masukkan password" required>
                            </div>

                            <!-- Konfirmasi Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="password2">Konfirmasi Password</label>
                                <input type="password" id="password2" class="form-control" placeholder="Masukkan Konfirmasi password" required>
                            </div>

                            <!-- Submit button -->
                            <button type="submit" id="registerButton" class="btn btn-signup col-12 mt-3">
                                Daftar
                            </button>
                            <hr>
                            <p class="text-center">Sudah punya akun? <a href="#/login" style='color: #548895'>Login
                                    Disini</a></p>

                            <br><br>
                            <footer class="text-center text-muted"> ©2023 NusantaraGo</footer>
                        </form>
                    </div>
                </div>

                <!-- Image Section -->
                <div class="col-lg-6 d-none d-lg-flex">
                    <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&amp;w=1470&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trendy Pants and Shoes" class="w-100 rounded">
                </div>
            </div>
        </div>
    </section>
    `;
  }

  /**
   * Validate email address to check if it's a valid Gmail account.
   * @param {string} email - The email address to validate.
   * @returns {boolean} True if the email is a valid Gmail account, false otherwise.
   */
  isValidEmail(email) {
    return email.endsWith("@gmail.com");
  }

  async afterRender() {
    // hapus navbar dan footer
    hideNavbarAndFooter();

    const submitForm = document.querySelector("form");
    const registerButton = document.querySelector("#registerButton");

    // Submit button
    const handleSubmit = (event) => {
      if (event.target.id === "registerButton") {
        const username = document.querySelector("#username");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
        const password2 = document.querySelector("#password2");
        const inputs = [username, email, password, password2];
        let isValid = true;
        // validasi input
        inputs.forEach((input) => {
          if (!isValid) {
            return;
          }
          // jika kosong
          if (input.value.trim() === "") {
            errorHandling(
              "Terjadi Kesalahan!",
              `input ${input.id} harus diisi!`
            );
            isValid = false;
            return;
          }
        });
        // end
        // cek email
        if (isValid) {
          if (!this.isValidEmail(email.value.trim())) {
            errorHandling("Terjadi Kesalahan!", "Email tidak valid!");
            isValid = false;
          }
        }
        // end
        // password check with confirm password check
        if (isValid) {
          if (password.value !== password2.value) {
            errorHandling(
              "Terjadi Kesalahan!",
              "Password dan Konfirmasi Password wajib sama!"
            );
            isValid = false;
          }
        }
        // end
        // jika terisi semua
        if (isValid) {
          const data = {
            username: username.value.trim().toLowerCase(),
            email: email.value.trim(),
            password: password.value,
            password2: password2.value,
          };
          // kirimkan ke bagian presenter
          this.#presenterPage = new RegisterPresenter({
            registerPage: this,
          });
          // kirim kan keapi melalui presenter
          this.#presenterPage.sendDataToAPI(data);
        }
      }
    };
    submitForm.addEventListener("submit", handleSubmit);
    registerButton.addEventListener("click", handleSubmit);
  }

  async errorHandlerFetch(error) {
    console.error(error);
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
        }
      } else {
        errorHandling("Error!", error.message);
      }
    }
  }

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

import { errorHandling } from "../../utils";
import { hideNavbarAndFooter } from "../../utils/auth";
import LoginPresenter from "./login-presenter";

export default class LoginPage {
  #presenterPage = null;
  async render() {
    return `
    <!--Section Login-->
      <section id='login' class="container text-center text-lg-start" style='padding-top: 8rem;
    width: 100vw;
    height: 50vw;'>
        <div class="card mb-3 shadow p-3 mb-5 bg-white rounded">
            <div class="row g-0">

                <!-- Form Section -->
                <div class="col-lg-6">
                    <div class="card-body px-md-5">
                        <div class="text-center mb-3">
                            <img src="images/logo.png" style="width: 185px;" alt="logo">
                        </div>
                        <form>
                            <h3 class="poppins-bold" style="color: #b57547;">Login Akun</h3>
                            <!-- username input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="form2Example1">Username</label>
                                <input type="text" id="username" class="form-control" required>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="form2Example2">Password</label>
                                <input type="password" id="password" class="form-control" required>
                            </div>

                            <!-- Submit button -->
                            <button type="button" id="masukButton" class="btn btn-login poppins-semibold col-12 mt-3">
                                Login
                            </button>
                            <hr>
                            <p class="text-center">Belum punya akun? <a href="#/register" style='color: #548895'>Daftar Disini</a></p>

                            <br><br>
                            <footer class="text-center text-muted"> ©2023 NusantaraGo</footer>
                        </form>
                    </div>
                </div>

                <!-- Image Section -->
                <div class="col-lg-6 d-none d-lg-flex">
                    <img src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&amp;w=1470&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="wisata bali" class="rounded img-fluid" width="631" height="636,84">
                </div>
            </div>
        </div>
    </section>
    `;
  }

  async afterRender() {
    // hapus navbar dan footer
    hideNavbarAndFooter();

    //   click button
    document.addEventListener("click", (event) => {
      if (event.target.id === "masukButton") {
        const username = document.querySelector("#username");
        const password = document.querySelector("#password");

        const inputs = [username, password];
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

        // jika terisi semua

        if (isValid) {
          const data = {
            username: username.value.trim(),
            password: password.value,
          };

          // kirimkan ke bagian presenter
          this.#presenterPage = new LoginPresenter({
            loginPage: this,
          });
          // kirim kan keapi melalui presenter
          if (this.#presenterPage) this.#presenterPage.sendDataToAPI(data);
        }
      }
    });
  }

  async errorHandlerFetch(error) {
    if (error.code === "ECONNABORTED") {
      errorHandling(
        "Timeout Error!",
        "Terjadi kesalahan dalam pengiriman data. Mohon coba lagi."
      );
    } else {
      if (error.status && error.status === 400) {
        errorHandling("Bad Request!", error.message);
      } else {
        errorHandling("Error!", error.message);
      }
    }
  }
}

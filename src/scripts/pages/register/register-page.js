import { hideNavbarAndFooter } from "../../utils/auth";
import RegisterPresenter from "./register-presenter";
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
                                <input type="email" id="email" class="form-control" placeholder="Masukkan email">
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" class="form-control" placeholder="Masukkan password">
                            </div>

                            <!-- Konfirmasi Password input -->
                            <div class="form-outline mb-3">
                                <label class="form-label" for="password2">Konfirmasi Password</label>
                                <input type="password" id="password2" class="form-control" placeholder="Masukkan Konfirmasi password">
                            </div>

                            <!-- Submit button -->
                            <button type="button" id="registerButton" class="btn btn-signup col-12 mt-3">
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

  async afterRender({ Swal }) {
    // hapus navbar dan footer
    hideNavbarAndFooter();

    //   click button
    document.addEventListener("click", (event) => {
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

          if (input.value.trim() === "") {
            Swal.fire({
              icon: "error",
              title: "Terjadi Kesalahan!",
              text: "Semua input harus diisi!",
            });
            isValid = false;
            return;
          }
        });
        // end

        // jika terisi semua
        if (isValid) {
          const data = {
            username: username.value,
            email: email.value,
            password: password.value,
            password2: password2.value,
          };

          // kirimkan ke bagian presenter
          this.#presenterPage = new RegisterPresenter({
            registerPage: this,
          });

          this.#presenterPage.sendDataToAPI(data);
        }
      }
    });
  }
}

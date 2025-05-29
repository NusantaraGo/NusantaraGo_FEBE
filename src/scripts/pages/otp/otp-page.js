import { errorHandling } from "../../utils";
import { hideNavbarAndFooter } from "../../utils/auth";
import OtpPresenter from "./otp-presenter";
export default class OtpPage {
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
                            <h3 class="poppins-bold" style="color: #b57547;">OTP</h3>
                            <p class="text-muted mb-2">Masukkan kode OTP 6 digit yang telah dikirim ke: <span id='email_text' class='poppins-semibold'>s*******@gmail.com</span></p>
                            
                            <!-- input email -->
                            <input type='hidden' id='email' onclick='(e)=>e.preventDefault()' class="form-control disabled" value='s*******@gmail.com' readonly>
                            
                            <!-- input Otp -->
                            <div class="form-outline mb-5">
                                <input type="text" id="otp" class="form-control" placeholder="Masukkan Otp" maxlength="6" inputmode="numeric" required>
                                <p class="text-muted">*Masukkan kode Otp sebanyak 6 angka</p>
                            </div>
                            <div class="mb-5">
                              <p class='text-center text-muted poppins-semibold'>Waktu Mundur</p>
                              <p id="countodown_time_otp" class='text-center poppins-regular'>12 : 05</p>
                            </div>

                            <!-- Submit button -->
                            <button type="button" id="verifikasiOtpButton" class="btn btn-signup col-12 mt-3">
                                Verifikasi OTP
                            </button>
                            <hr>
                            <p class="text-center">Batalkan pembuatan akun? <a href="#/login" style='color: #548895'>Login
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

    //   click button
    document.addEventListener("click", (event) => {
      if (event.target.id === "verifikasiOtpButton") {
        const email = document.querySelector("#email");
        const otp = document.querySelector("#otp");

        const inputs = [email, otp];
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
          if (otp.value.length === 6) {
            errorHandling("Terjadi Kesalahan!", "OTP tidak sama 6 angka");
            isValid = false;
          }
        }
        // end

        // jika terisi semua
        if (isValid) {
          const data = {
            email: email.value.trim(),
            otp: otp.value,
          };
          // kirimkan ke bagian presenter
          this.#presenterPage = new OtpPresenter({
            otpPage: this,
          });
          // kirim kan keapi melalui presenter
          this.#presenterPage.sendDataToAPI(data);
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

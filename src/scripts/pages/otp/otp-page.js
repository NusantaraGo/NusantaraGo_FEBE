import { errorHandling, successHandling } from "../../utils";
import { hideNavbarAndFooter } from "../../utils/auth";
import OtpPresenter from "./otp-presenter";
export default class OtpPage {
  #presenterPage = null;
  /**
   * Render the OTP page
   * @returns {string} the OTP page
   */
  async render() {
    return `
      <section class="container text-center text-lg-start" style="padding-top: 8rem;">
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
                            
                            <!-- input Otp -->
                            <div class="form-outline mb-5">
                                <input type="text" id="otp" class="form-control" placeholder="Masukkan Otp" maxlength="6" inputmode="numeric" required>
                                <p class="text-muted">*Masukkan kode Otp sebanyak 6 angka</p>
                            </div>
                            <div class="mb-5">
                              <p class='text-center text-muted poppins-semibold'>Waktu Mundur</p>
                              <p id="countdown_time_otp" class='text-center poppins-regular'>12 : 05</p>
                            </div>

                            <!-- Submit button -->
                            <button type="submit" id="verifikasiOtpButton" class="btn btn-signup col-12 mt-3">
                                Verifikasi OTP
                            </button>
                            <hr>
                            <p class="text-center">Batalkan pembuatan akun? <a href="#/login" style='color: #548895'>Login
                                    Disini</a></p>

                            <br><br>
                            <footer class="text-center text-muted"> ©2025 NusantaraGo</footer>
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

  /**
   * Starts a countdown timer for the OTP page.
   * @param {number} durationInSeconds - The duration of the countdown in seconds.
   * @param {HTMLElement} display - The element that displays the countdown.
   * @param {function} [onComplete] - The callback function to call when the countdown is complete.
   * @description
   * Sets up a countdown timer that displays the time remaining in the format "mm:ss".
   * The timer starts immediately and calls the onComplete function when it is complete.
   */
  startOtpCountdown(durationInSeconds, display, onComplete) {
    let timer = durationInSeconds;

    // Deklarasikan variabel interval di sini
    let countdownInterval;

    function updateDisplay() {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

      if (--timer < 0) {
        clearInterval(countdownInterval);
        display.textContent = "00:00";
        if (typeof onComplete === "function") {
          onComplete();
          return;
        }
      }
    }

    if (timer > 0) {
      // Update segera tanpa menunggu 1 detik pertama
      updateDisplay();
    }
    // Set interval setelah fungsi didefinisikan
    countdownInterval = setInterval(updateDisplay, 1000);
  }

  /**
   * Mengecek parameter di URL apakah ada atau tidak. Jika tidak ada maka akan
   * menampilkan error dan mengembalikan nilai false. Jika ada maka akan
   * mengembalikan nilai true berserta dengan parameter yang diambil.
   * @returns {object} - Contoh response: { searchParams: string, isValid: boolean }
   */
  checkSearchParams() {
    // ambil uuid pathname dari url

    const url = new URL(window.location.href);
    const searchParams = url.hash.split("/")[2];

    if (!searchParams) {
      return window.location.reload();
    }

    let isValid = true;

    // cek parameternya ada atau tidak
    if (searchParams.trim().length === 0) {
      errorHandling("Terjadi Kesalahan!", `Parameter wajib ada `);
      isValid = false;
    } else if (typeof searchParams !== "string") {
      errorHandling("Terjadi Kesalahan!", `Parameter wajib berupa string`);
      isValid = false;
    }

    if (!isValid) {
      return;
    } else {
      return { searchParams, isValid };
    }
  }

  /**
   * Sends the OTP data to the backend for verification and session management.
   * @param {object} data - The data object containing the OTP and other necessary information.
   * @description
   * - Instantiates the OTP presenter and passes the OTP page instance as an argument.
   * - Calls the sendDataToAPI method of the OTP presenter to send the data to the backend.
   */
  sendToBackend(data) {
    // kirimkan ke bagian presenter
    this.#presenterPage = new OtpPresenter({
      otpPage: this,
    });
    // kirim kan keapi melalui presenter
    this.#presenterPage.sendDataToAPI(data);
  }

  /**
   * Method executed after the OTP page elements are rendered.
   * Initializes event listeners for the OTP form submission and starts the
   * countdown timer. Validates input and handles form submission to verify OTP.
   * Also checks for expired OTP and handles session storage accordingly.
   *
   * @return {Promise<void>}
   * @description
   * - Hides the navbar and footer for the page.
   * - Captures the form and necessary elements for OTP processing.
   * - Adds an event listener for the OTP form submission, validating the input and sending data to the backend if valid.
   * - Checks session storage for OTP expiration time and starts a countdown timer, displaying messages when the OTP expires.
   * - Handles backend communication for OTP verification and session management.
   */

  async afterRender() {
    // hapus navbar dan footer
    hideNavbarAndFooter();
    // Tangkap form dan elements
    const otpForm = document.querySelector("form");
    const display = document.getElementById("countdown_time_otp");
    const titleTime = display.previousElementSibling;

    // submit button
    const handleSubmit = (event) => {
      console.log(event.submitter?.id);
      if (event.submitter?.id === "verifikasiOtpButton") {
        // chekc params
        // ambil dan check search params
        let { searchParams, isValid } = this.checkSearchParams();

        // dapatkan nilai otp
        const otp = document.querySelector("#otp");

        const inputs = [otp];

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

        // otp check with otp value
        if (isValid) {
          if (otp.value.length !== 6) {
            errorHandling("Terjadi Kesalahan!", "OTP tidak sama 6 angka");
            isValid = false;
          }
        }
        // end

        // jika terisi semua
        if (isValid) {
          const data = {
            searchParams: searchParams.trim(),
            otp: otp.value,
          };
          // kirimkan ke bagian presenter
          this.sendToBackend(data);
        }
      }
    };

    // submit form
    otpForm.addEventListener("submit", handleSubmit);

    // ambil dari session storage dan dapatkan otp expired at
    const otpTime = sessionStorage.getItem("otpTime");
    // cek ada atau tidak
    if (!otpTime) {
      display.textContent = "00:00";
      return;
    }
    const otpExpiredAt = JSON.parse(otpTime).otpExpiredAt;

    // buat remaining detik
    const now = new Date();
    const expiredDate = new Date(otpExpiredAt);
    const remainingSeconds = Math.floor((expiredDate - now) / 1000);

    // Mulai countdown
    this.startOtpCountdown(remainingSeconds, display, () => {
      display.innerHTML =
        "Kode anda sudah kadaluarsa. <a href='#/register'>Daftar ulang</a>";
      display.classList.add("text-muted");
      titleTime.textContent = "Waktu Habis";

      // ambil dan cheks params
      const { searchParams, isValid } = this.checkSearchParams();

      if (isValid) {
        // hapus session storage
        sessionStorage.removeItem("otpTime");

        // buat data dan kirim ke backend
        const data = {
          searchParams: searchParams.trim(),
          otp: "",
        };
        this.sendToBackend(data);
      }

      return;
    });
  }

  /**
   * Handles errors that occur during data fetching operations.
   * If the error is a timeout error, it will display a "Timeout Error!"
   * message. If the error has a response, it will extract the error details
   * from the response and display an error message accordingly.
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
   * @param {object} params - The object containing response details.
   * @param {number} params.statusCode - The HTTP status code of the response.
   * @param {string} params.message_title - The title of the success message.
   * @param {string} params.detail_message - The detail message to be displayed.
   * @param {object} [params.error] - The error object provided by Axios when a request fails.
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

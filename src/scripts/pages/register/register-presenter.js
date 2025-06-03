import { postData } from "../../data/api";

class RegisterPresenter {
  #registerPage;
  constructor({ registerPage }) {
    this.#registerPage = registerPage;
  }

  /**
   * Mengirimkan data ke API.
   * @param {object} data - Data yang dikirimkan.
   * @returns {Promise<object>} Respon dari API.
   */
  async sendDataToAPI(data) {
    try {
      // mendapatkan response dari post data di file
      const response = await postData(
        data,
        undefined,
        undefined,
        "/auth/register"
      );

      // pemisahaan
      const { email, otpExpiredAt } = response.data;

      // Simpan waktu di session storage dengan key tertentu
      sessionStorage.setItem(
        "otpTime", // Key/Nama untuk data ini
        JSON.stringify({
          // Value yang disimpan (dikonversi ke string)
          otpExpiredAt,
        })
      );

      await this.#registerPage.successHandlerFetch(response);
      window.location.replace("#/verify-otp/" + email);
    } catch (error) {
      await this.#registerPage.errorHandlerFetch(error);
    }
  }
}

export default RegisterPresenter;

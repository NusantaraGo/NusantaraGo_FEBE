import { patchData } from "../../data/api";

class OtpPresenter {
  #otpPage;
  constructor({ otpPage }) {
    this.#otpPage = otpPage;
  }

  /**
   * Mengirimkan data ke API.
   * @param {object} data - Data yang dikirimkan.
   * @returns {Promise<object>} Respon dari API.
   */
  async sendDataToAPI(data) {
    try {
      const response = await patchData(
        data,
        undefined,
        undefined,
        "/auth/verify-otp"
      );

      await this.#otpPage.successHandlerFetch(response);
      // langsung ke url login
      window.location.replace("#/login");
    } catch (error) {
      await this.#otpPage.errorHandlerFetch(error);
    }
  }
}

export default OtpPresenter;

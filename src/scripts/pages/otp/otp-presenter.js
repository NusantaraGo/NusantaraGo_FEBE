import { postData } from "../../data/api";

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
      const response = await postData(data, undefined, undefined, "/auth/otp");
      console.log(response); //tampilan response dari fecth
    } catch (error) {
      await this.#otpPage.errorHandlerFetch(error);
    }
  }
}

export default OtpPresenter;

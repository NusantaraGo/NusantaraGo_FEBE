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
      const response = await postData(
        data,
        undefined,
        undefined,
        "/auth/register"
      );
      console.log(response); //tampilan response dari fecth
    } catch (error) {
      await this.#registerPage.errorHandlerFetch(error);
    }
  }
}

export default RegisterPresenter;

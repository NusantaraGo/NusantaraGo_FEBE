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
      const response = await postData(data);
      console.log(response); //tampilan response dari fecth
    } catch (error) {}
  }
}

export default RegisterPresenter;

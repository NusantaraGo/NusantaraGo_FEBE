import { getData } from "../../data/api";
import { putData } from "../../data/api";
export default class myProfilePage {
  #myProfilePage = null;

  /**
   * Initializes a new instance of the myProfilePage class.
   *
   * @param {object} params - The parameters for initializing the class.
   * @param {object} params.myProfilePage - The myProfilePage object to be assigned to the instance.
   */

  constructor({ myProfilePage }) {
    this.#myProfilePage = myProfilePage;
  }

  /**
   * Sends data to the API to update the user's profile.
   * @param {object} datas - The data to be sent to the API.
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   */
  async sendDataToApi(datas) {
    try {
      const response = await putData(
        datas,
        undefined,
        undefined,
        "/auth/update-user"
      );
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      await this.#myProfilePage.successHandlerFetch(response);
    } catch (error) {
      await this.#myProfilePage.errorHandlerFetch(error);
    }
  }

  /**
   * Retrieves user data from the API.
   * @return {Promise<object>} - A promise that resolves to the user data retrieved from the API.
   * @throws Will call the error handler if the request fails.
   */

  async getUser() {
    try {
      const response = await getData(undefined, undefined, "/auth/get-user");
      return response;
    } catch (error) {
      await this.#myProfilePage.errorHandlerFetch(error);
      return;
    }
  }

  /**
   * Retrieves user data from the API and logs out the user.
   * If the request is successful, it will redirect the user to the login page.
   * If the request fails, it will call the error handler.
   * @return {Promise<void>}
   * @throws Will call the error handler if the request fails.
   */
  async getLogout() {
    try {
      const response = await getData(undefined, undefined, "/auth/logout");
      await this.#myProfilePage.successHandlerFetch(response);
      window.location.replace("#/");
    } catch (error) {
      await this.#myProfilePage.errorHandlerFetch(error);
    }
  }
}

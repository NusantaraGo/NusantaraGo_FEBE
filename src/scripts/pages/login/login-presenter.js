import { postData } from "../../data/api";

class LoginPresenter {
  #loginPage;
  /**
   * Initializes a new instance of the LoginPresenter class.
   *
   * @param {object} param0 - The parameters object.
   * @param {LoginPage} param0.loginPage - The login page instance to associate with this presenter.
   */

  constructor({ loginPage }) {
    this.#loginPage = loginPage;
  }

  /**
   * Sends data to the API for login authentication.
   *
   * @param {object} data - The login data to be sent, including username and password.
   * @returns {Promise<void>} - A promise that resolves after the API response is handled.
   *
   * This function attempts to post the login data to the "/auth/login" endpoint.
   * If successful, it calls the success handler and redirects the user to the dashboard.
   * If an error occurs, it calls the error handler to manage the error.
   */

  async sendDataToAPI(data) {
    try {
      const response = await postData(
        data,
        undefined,
        undefined,
        "/auth/login"
      );

      await this.#loginPage.successHandlerFetch(response);
      // langsung ke url dashboard
      window.location.replace("#/");
    } catch (error) {
      await this.#loginPage.errorHandlerFetch(error);
    }
  }
}

export default LoginPresenter;

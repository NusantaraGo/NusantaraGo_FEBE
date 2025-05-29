import { postData } from "../../data/api";

class LoginPresenter {
  #loginPage;
  constructor({ loginPage }) {
    this.#loginPage = loginPage;
  }

  async sendDataToAPI(data) {
    try {
      const response = await postData(
        data,
        undefined,
        undefined,
        "/auth/login"
      );
      console.log("response=", response); //tampilan response dari fecth
    } catch (error) {
      await this.#loginPage.errorHandlerFetch(error);
    }
  }
}

export default LoginPresenter;

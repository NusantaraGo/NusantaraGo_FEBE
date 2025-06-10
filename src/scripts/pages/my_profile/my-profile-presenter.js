import { getData } from "../../data/api";
import { putData } from "../../data/api";
export default class myProfilePage {
  #myProfilePage = null;

  constructor({ myProfilePage }) {
    this.#myProfilePage = myProfilePage;
  }

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

  async getUser() {
    try {
      const response = await getData(undefined, undefined, "/auth/get-user");
      return response;
    } catch (error) {
      await this.#myProfilePage.errorHandlerFetch(error);
      return;
    }
  }

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

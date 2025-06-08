import { getDataUser } from "../../data/api";
export default class myProfilePage {
  #myProfilePage = null;

  constructor({ myProfilePage }) {
    this.#myProfilePage = myProfilePage;
  }

  async getUser() {
    try {
      const response = await getDataUser(
        undefined,
        undefined,
        "/auth/get-user"
      );
      return response;
    } catch (error) {
      await this.#myProfilePage.errorHandlerFetch(error);
      return;
    }
  }
}

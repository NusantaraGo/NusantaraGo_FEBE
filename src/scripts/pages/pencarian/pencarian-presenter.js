import { getDataML, validateImage } from "../../data/api";

class PencarianPresenter {
  #pencarianPage;
  constructor({ pencarianPage }) {
    this.#pencarianPage = pencarianPage;
  }

  async getAllAccomodations() {
    try {
      const response = await getDataML(undefined, "/api/attractions");
      return response;
    } catch (error) {
      await this.#pencarianPage.errorHandlerFetch(error);
      return [];
    }
  }

  // async validateImagePresenter(url) {
  //   try {
  //     const response = await validateImage(url);
  //     return response;
  //   } catch (error) {
  //     if (error) {
  //       return false;
  //     }
  //   }
  // }
}

export default PencarianPresenter;

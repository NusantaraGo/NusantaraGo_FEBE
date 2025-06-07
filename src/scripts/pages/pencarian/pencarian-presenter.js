import { getDataML, validateImage } from "../../data/api";

class PencarianPresenter {
  #pencarianPage;
  constructor({ pencarianPage }) {
    this.#pencarianPage = pencarianPage;
  }

  async getAllAccomodations(filteredData) {
    const queryString = new URLSearchParams(filteredData).toString();
    console.log(queryString);
    try {
      const response = await getDataML(
        undefined,
        "/api/attractions?" + queryString
      );
      return response;
    } catch (error) {
      await this.#pencarianPage.errorHandlerFetch(error);
      return [];
    }
  }

  async getGroupBy(data) {
    try {
      let response;
      if (data === "min_rating") {
        response = Array.from({ length: 9 }, (_, i) =>
          (1 + i * 0.5).toString()
        );
      } else {
        response = await getDataML(undefined, `/api/${data}`);
      }
      return response;
    } catch (error) {
      await this.#pencarianPage.errorHandlerFetch(error);
      return false;
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

import { getDataML, validateImage } from "../../data/api";

class PencarianPresenter {
  #pencarianPage;
  constructor({ pencarianPage }) {
    this.#pencarianPage = pencarianPage;
  }

  /**
   * Retrieves all accommodations, optionally filtered by the provided data.
   *
   * @param {object|null} filteredData - The data used to filter accommodations.
   *                                     If null, no filtering is applied.
   * @returns {Promise<Array>} - A promise that resolves to an array of accommodations.
   *                             If an error occurs, an empty array is returned.
   */

  async getAllAccomodations(filteredData) {
    try {
      const response = await getDataML(
        undefined,
        "/api/attractions",
        filteredData
      );
      return response;
    } catch (error) {
      await this.#pencarianPage.errorHandlerFetch(error);
      return [];
    }
  }

  /**
   * Retrieves grouped data based on the provided category.
   *
   * @param {string} data - The category to group by. If "min_rating",
   *                        returns an array of rating values. Otherwise,
   *                        fetches data from the API for the specified category.
   * @returns {Promise<Array|string|boolean>} - An array of grouped values,
   *                                            or false if an error occurs.
   */

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

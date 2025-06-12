import { getDataML, validateImage, getData } from "../../data/api";

class PencarianPresenter {
  #pencarianPage;

  /**
   * Constructor for PencarianPresenter class.
   * @param {object} options - Object containing the PencarianPage instance.
   * @param {PencarianPage} options.pencarianPage - The PencarianPage instance.
   */
  constructor({ pencarianPage }) {
    this.#pencarianPage = pencarianPage;
  }
  /**
   * Retrieves user data from the API and returns it if successful.
   * If the request fails, it will call the error handler and redirect the user to the login page.
   * @return {Promise<object>} - The user data if the request is successful.
   * @throws Will call the error handler and redirect the user to the login page if the request fails.
   */

  async getUser() {
    try {
      const response = await getData(undefined, undefined, "/auth/get-user");
      return response;
    } catch (error) {
      await this.#pencarianPage.errorHandlerFetch(error);
      window.location.replace("#/login");
    }
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
      let response = await getDataML(
        undefined,
        "/api/attractions",
        filteredData
      );

      if (response) {
        // Parameter global
        const mean_of_rating = await this.hitungRataRataRating(response);
        const jumlah_review = 100;

        for (const data_accomodation of response) {
          data_accomodation.skor = await this.hitungSkorBayesian(
            data_accomodation.rating,
            data_accomodation.jumlah_review,
            mean_of_rating,
            jumlah_review
          );
        }

        response = response.sort((a, b) => {
          return b.skor - a.skor;
        });

        console.log(response);
      }

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

  /**
   * Calculates the average rating of the given accommodations.
   * @param {Array} data - An array of accommodations.
   * @returns {number} - The average rating of the accommodations.
   */
  async hitungRataRataRating(data) {
    const totalRating = data.reduce((sum, p) => sum + p.rating, 0);
    return totalRating / data.length;
  }

  async hitungSkorBayesian(R, v, C, m) {
    return (v / (v + m)) * R + (m / (v + m)) * C;
  }
}

export default PencarianPresenter;

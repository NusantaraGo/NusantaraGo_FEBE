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
      if (filteredData && filteredData.q) {
        // Langkah 1: Panggil API rekomendasi ML
        const mlRecommendations = await getDataML(
          undefined,
          "/api/recommendations/content",
          { name: filteredData.q }
        );
        console.log("ML Recommendations response:", mlRecommendations);

        if (!mlRecommendations || mlRecommendations.length === 0) {
          console.log("No ML recommendations found. Returning empty array.");
          return [];
        }

        // Langkah 2: Ekstrak ID dari rekomendasi ML
        const recommendedIds = mlRecommendations.map((item) => item.id);
        console.log("Recommended IDs:", recommendedIds);

        // Langkah 3: Panggil API attractions untuk mendapatkan semua data lengkap
        const allAttractions = await getDataML(undefined, "/api/attractions");
        console.log("All Attractions response:", allAttractions);

        if (!allAttractions || allAttractions.length === 0) {
          console.log(
            "No attractions found from /api/attractions. Returning empty array."
          );
          return [];
        }

        // Langkah 4: Filter data attractions berdasarkan ID rekomendasi
        const filteredAttractions = allAttractions.filter((attraction) =>
          recommendedIds.includes(attraction.id)
        );
        console.log("Filtered Attractions:", filteredAttractions);

        return filteredAttractions;
      } else {
        // Jika tidak ada query pencarian, tampilkan semua data attractions
        const response = await getDataML(
          undefined,
          "/api/attractions",
          filteredData // tetap lewatkan filter data yang ada (kategori, provinsi, rating)
        );
        return response;
      }
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
}

export default PencarianPresenter;

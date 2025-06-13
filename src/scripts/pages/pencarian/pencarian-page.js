import { visibleNavbarAndFooter } from "../../utils/auth";
import PencarianPresenter from "./pencarian-presenter";
import { errorHandling, successHandling } from "../../utils";
import ChatbotComponent from "../../components/chatbot_comp";

class PencarianPage {
  #presenterPage = null;
  #html = null;
  #chatbotComponent = null;

  constructor() {
    this.#chatbotComponent = new ChatbotComponent();
  }

  /**
   * Render the Pencarian page HTML.
   *
   * @returns {string} The rendered HTML of Pencarian page.
   */
  async render() {
    const chatbotHtml = await this.#chatbotComponent.render();
    return `
      <section id='pencarian' class="container text-center text-lg-start" style='padding-top: 4rem;'>
        <div class="container">
                <div class="jelajahi">
                    <h1 style="font-size: 36px; font-weight: 900">
                        Jelajahi Tempat Wisata
                    </h1>
                    <form id='pencarianForm' method="GET" class="search-form mt-4 row">
                      <div class="col-12 d-flex align-items-center gap-2 mb-4" style="height: 50px;">
                        <select id='provinces' name='provinces' class="form-select w-25 poppins-medium" aria-label="Select groupBy for search">
                          <option selected>--provinsi--</option>
                        </select>
                        <select id='categories' name='categories' class="form-select w-25 poppins-medium" aria-label="Select groupBy for search">
                          <option selected>--kategori--</option>
                        </select>
                        <input type="number" id="min_rating" name='min_rating' min="0" max="5" class="form-control poppins-regular" step="0.1" style="max-width:80px">
                        <input type="range" class="form-range" min="0" max="5" step="0.1" id="customRange1">
                      </div>
                      <div class="input-group col-12" style="height: 50px;">
                          <input type="text" id="pencarian" name='q' class="form-control poppins-regular" placeholder="Cari penginapan berdasarkan nama wisata...">
                          <button type="submit" class="btn btn-custom">Cari</button>
                      </div>
                    </form>
                </div>

                <div class="album py-5">
                    <div class="container">
                        <!-- Add accommodations -->
                        <div id='penginapan-container' class="row g-3">
                            
                        </div>
                        <!-- Add pagination links -->
                        <div id='pagination-container' class="pagination justify-content-center mt-5">
                            
                        </div>
                    </div>
                </div>
        </div>
      </section>
      ${chatbotHtml}
    `;
  }

  /**
   * Mendapatkan data user dari API.
   * @return {Promise<object>} - Data user yang diambil dari API.
   */
  async getUser() {
    this.#presenterPage = new PencarianPresenter({ pencarianPage: this });
    return await this.#presenterPage.getUser();
  }

  /**
   * Function to generate HTML template for accommodations based on the given data
   * @param {Array} allAccommodations - All accommodations data
   * @param {Object} data - Data for the current page
   * @returns {String} - HTML template for the accommodations
   */
  async template(allAccommodations, data) {
    if (!allAccommodations || allAccommodations.length === 0) return false;
    return await this.calculateCurrentPages(allAccommodations, data);
  }

  checkImageLoad(url) {
    return new Promise((resolve, reject) => {
      const testImg = new Image();
      testImg.onload = () => resolve();
      testImg.onerror = () => reject();
      testImg.src = url;
    });
  }

  async validateImage(name, img) {
    let placeholder = `https://imageplaceholder.net/408x272?text=${name}`;
    if (!img) return placeholder;

    try {
      await this.checkImageLoad(img);
      return img; // Gambar berhasil dimuat
    } catch (error) {
      return placeholder; // Gagal dimuat, pakai placeholder
    }
  }

  /**
   * Renders HTML templates for a list of accommodations.
   *
   * @param {Array} datas - Array of accommodation data objects.
   * @returns {Promise<string>} - A promise that resolves to the generated HTML string.
   */

  async renderTemplate(datas) {
    /**
     * make rate star from rates item
     * @param {*} rating
     * @returns
     */
    function createStars(rating) {
      let starsHTML = "";
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
      }

      if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
      }

      const emptyStars = 5 - Math.ceil(rating);
      for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
      }

      return starsHTML;
    }

    function kategori(angka_probabilitas) {
      let angka_fixed = angka_probabilitas.toFixed(2);
      let html_span = ``;

      if (angka_fixed > 4.6) {
        html_span = `<button class="mb-2 btn btn-outline-info rounded">Super Rekomendasi</button>`;
      } else if (angka_fixed > 4.3) {
        html_span = `<button class="mb-2 btn btn-outline-primary rounded">Rekomendasi</button>`;
      } else if (angka_fixed > 3.8) {
        html_span = ``;
      } else if (angka_fixed >= 3.4) {
        html_span = `<button class="mb-2 btn btn-outline-danger rounded">Tidak Rekomendasi</button>`;
      }

      return html_span;
    }

    // Generate HTML for current page items
    let html = "";
    console.log(datas);
    for (const item of datas) {
      const validImage = await this.validateImage(item.nama, item.foto);

      html += `
        <div id="tour-${item.id}" class="col">
          <div class="card shadow">
            <div class="image" style="height:20em">
              <img class="card-img-top object-fit-cover h-100" style="object-position:center;" src='${validImage}' class="card-img-top" alt="${
        item.nama
      }.jpg">
            </div>
            <div class="card-body">
             ${kategori(item.skor)}
              <h5 class="card-title text-justify text-truncate">${
                item.nama
              }</h5>
              <p class="location-text">
                <span class="location-icon me-1">📍</span>${item.provinsi}
              </p>
              <p class="card-description" style='height:150px'>${
                item.deskripsi
              }</p>
              <div class="rating-section">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <span class="stars">${createStars(item.rating)}</span>
                    <span class="rating-text">${item.rating}</span>
                  </div>
                  <span class="reviews-count">(${item.jumlah_review.toLocaleString()} ulasan)</span>
                </div>
              </div>
              <div class="mt-auto">
                <div class="d-flex justify-content-between align-items-center">
                  <a href="#/detail/${item.id}" class="btn btn-custom">
                    <i class="fas fa-info-circle me-2"></i>Lihat Detail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return html;
  }

  /**
   * Convert a string to title case. This function takes a string and returns it
   * with all words capitalized. It also replaces all underscores with spaces.
   * @param {string} str - The string to convert to title case
   * @returns {string} The title case string
   */
  async toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  /**
   * Generate HTML for dropdown options from given array of strings. It will
   * convert each string to title case and replace all underscores with spaces.
   * @param {string[]} datas - Array of strings to generate options from
   * @returns {string} HTML string of options
   */
  async renderOptionBy(datas) {
    let html = "";
    for (const item of datas) {
      const label = await this.toTitleCase(item.replace(/_/g, " "));
      html += `<option value="${item}">${label}</option>\n`;
    }
    return html;
  }

  /**
   * Gets all distinct values for the given field from the database.
   * @param {string} data - The field to get distinct values for
   * @returns {Promise<Array<string>|false>} - A promise that resolves to an array
   *     of distinct values if successful, or false if no data is found.
   */
  async getGroupBy(data) {
    this.#presenterPage = new PencarianPresenter({ pencarianPage: this });
    const values = await this.#presenterPage.getGroupBy(data);
    return values;
  }
  /**
   * Calculate the current page items (3 items per page) and render the
   * template for the current page items.
   * @param {Array} datas - All accommodations data
   * @param {Array} data - Array of current page number, e.g. [1]
   * @returns {Promise<string>} - HTML template for the current page items
   */
  async calculateCurrentPages(datas, data) {
    // Calculate the current page items (3 items per page)
    const itemsPerPage = 3;
    const startIndex = (data[0] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = datas.slice(startIndex, endIndex);
    return await this.renderTemplate(currentItems);
  }

  /**
   * Gets all accommodation data from API. If groupBy is provided, it will group
   * the data by the given field.
   * @param {string|null} groupBy - The field to group the data by. If not provided,
   *     it will return all data ungrouped.
   * @returns {Promise<Array|false>} - A promise that resolves to an array of
   *     accommodation data objects if successful, or false if no data is found.
   */
  async getData(groupBy = null) {
    // Sample data for all accommodations
    this.#presenterPage = new PencarianPresenter({ pencarianPage: this });
    const allAccommodations = await this.#presenterPage.getAllAccomodations(
      groupBy
    );

    if (allAccommodations.length === 0 || !allAccommodations) {
      return false;
    }

    return allAccommodations;
  }

  /**
   * Creates a pagination on the given element, using the given array of
   * accommodation data. If the data is empty, it will not create the
   * pagination.
   * @param {Array} allAccommodations - Array of all accommodations data
   */
  async handlePagination(allAccommodations) {
    // buat pagination
    $("#pagination-container").pagination({
      dataSource: Array.from(
        { length: Math.ceil(allAccommodations.length / 3) },
        (_, i) => i + 1
      ),
      pageRange: 0,
      pageSize: 1,
      className: "paginationjs paginationjs-theme-system paginationjs-big",
      autoHidePrevious: true,
      autoHideNext: true,
      callback: async (data, pagination) => {
        let html = await this.template(allAccommodations, data);
        const penginapanContainer = $("#penginapan-container");
        if (!html) {
          html = `
          <div class="col-12">
            <div class="card shadow">
              <div class="card-body text-center">
                <img class='mb-2' width="48" height="48" src="https://img.icons8.com/emoji/48/warning-emoji.png" alt="warning-emoji"/>
                <h4 class="card-title-bold">Data tidak ditemukan</h4>
              </div>
            </div>
          </div>
        `;

          // jika container penginapan memiliki kelas
          // row-cols-1 row-cols-sm-2 row-cols-md-3, maka
          // hapus kelas tersebut. hal ini dilakukan agar
          // ketika data tidak ditemukan, maka container
          // penginapan tidak memiliki kelas yang membuat
          // tampilan menjadi tidak sesuai.
          if (
            penginapanContainer.hasClass(
              "row-cols-1 row-cols-sm-2 row-cols-md-3"
            )
          ) {
            penginapanContainer.removeClass(
              "row-cols-1 row-cols-sm-2 row-cols-md-3"
            );
          }
        } else {
          // jika data ditemukan, maka tambahkan kelas row-cols-1
          // row-cols-sm-2 row-cols-md-3 pada container penginapan,
          // agar tampilan menjadi sesuai.
          penginapanContainer.addClass(
            "row-cols-1 row-cols-sm-2 row-cols-md-3"
          );
        }

        // tambahkan htmlnya ke container
        penginapanContainer.html(html);
      },
    });
    // end
  }

  /**
   * Handles form submission event for search functionality. Prevents the default
   * form submission behavior, extracts form data, and configures specific fields
   * for processing. Converts 'categories' and 'provinces' fields to empty strings
   * if they have default placeholder values. Returns processed data to be used
   * for fetching accommodations data.
   *
   * @param {Event} event - The form submission event object.
   * @returns {Promise<Array|false>} - A promise that resolves to an array of
   *     accommodation data objects if successful, or false if no data is found.
   */

  async submitTriggerEvent(event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // konfigurasi categories menjadi string kosong
    if ("categories" in data && data?.categories === "--kategori--") {
      data["categories"] = "";
    }

    // konfigurasi categories menjadi string kosong
    if ("provinces" in data && data?.["provinces"] === "--provinsi--") {
      data["provinces"] = "";
    }

    const data_new = {
      category: data?.categories,
      province: data?.provinces,
      min_rating: data?.min_rating,
      q: data?.q,
    };

    return this.getData(data_new);
  }

  /**
   * Handles errors that occur during data fetching operations. This function
   * checks for specific error conditions such as request timeouts and
   * HTTP response errors. Based on the error details, it displays appropriate
   * error messages to the user using a custom error handling function.
   *
   * @param {Object} error - The error object provided by Axios when a request fails.
   * @param {string} error.code - The error code, e.g., 'ECONNABORTED' for timeout errors.
   * @param {Object} error.response - The response object from the server in case of HTTP errors.
   * @param {number} error.response.status - The HTTP status code of the response.
   * @param {string} error.response.statusText - The status text of the response.
   * @param {Object} error.response.data - The data object containing error details from the server.
   * @param {string} error.response.data.message - The error message from the server.
   * @param {string} error.response.data.error - The error type or description from the server.
   */

  async errorHandlerFetch(error) {
    if (error.code === "ECONNABORTED") {
      errorHandling(
        "Timeout Error!",
        "Terjadi kesalahan dalam pengiriman data. Mohon coba lagi."
      );
    } else {
      if (error.response) {
        // Ambil detail dari response Axios
        const errJson = {
          status: error.response.status,
          statusText: error.response.statusText,
          message: error.response.data.message.replace("_", " "),
          error: error.response.data.error,
        };

        if (errJson.status >= 400) {
          if (!errJson.error) {
            errJson.error = errJson.statusText;
          }
          errorHandling(errJson.error, errJson.message);
        }
      } else {
        errorHandling("Error!", error.message);
      }
    }
  }

  /**
   * Handles successful responses from data fetching operations. This function
   * displays success messages to the user using a custom success handling
   * function if the response status code is between 200 and 400 and there is
   * no error.
   *
   * @param {Object} params - The object containing response details.
   * @param {number} params.statusCode - The HTTP status code of the response.
   * @param {string} params.message_title - The title of the success message.
   * @param {string} params.detail_message - The detail message to be displayed.
   * @param {Object} [params.error] - The error object provided by Axios when a request fails.
   * @returns {Promise<void>}
   */
  async successHandlerFetch({
    statusCode,
    message_title,
    detail_message,
    error,
  }) {
    if (statusCode >= 200 && statusCode <= 400 && error === null) {
      return await successHandling(message_title, detail_message);
    }
  }

  /**
   * Handles the after render event of the page. This function sets up the page
   * after the HTML has been rendered. It imports jQuery and paginationjs, sets
   * up the navigation bar, and configures the select options for provinces and
   * categories. It also sets up the event listener for the form submission and
   * fetches the data if the form has not been submitted yet.
   * @returns {Promise<void>}
   */
  async afterRender() {
    // inisialisasi
    let response;

    // tampilkan navbar
    visibleNavbarAndFooter();

    // import jquery
    const $ = require("jquery");
    window.jQuery = $;
    await require("paginationjs");

    // ambil user tokenize

    response = await this.getUser();

    // jadikan data user saja
    try {
      const users = response?.data;
      if (!users) {
        return;
      }
    } catch (error) {
      return await this.errorHandlerFetch(error.message);
    }

    // konfigurasi provinsi
    try {
      // ambil data provinsi
      const provinces = await this.getGroupBy("provinces");
      // konfigurasi untuk option
      this.#html = await this.renderOptionBy(provinces);
      // tambahkan option
      $("#provinces").append(this.#html);
    } catch (err) {
      return;
    }
    // emd

    // konfigurasi kategori
    try {
      // ambil data kategori
      const categories = await this.getGroupBy("categories");
      // konfigurasi untuk option
      this.#html = await this.renderOptionBy(categories);
      // tambahkan option
      $("#categories").append(this.#html);
    } catch (error) {
      return;
    }
    // end

    // konfigurasi rating
    // Saat range diubah, update input number
    $("#customRange1").on("input", function () {
      $("#min_rating").val($(this).val());
    });

    // Saat number diubah, update input range
    $("#min_rating").on("input", function () {
      let val = parseFloat($(this).val());
      // Validasi agar dalam rentang 0–5
      if (!isNaN(val) && val >= 0 && val <= 5) {
        $("#customRange1").val(val);
      }
    });

    // Render and initialize chatbot
    await this.#chatbotComponent.afterRender();
    // end

    // Bind event submit form
    $("#pencarianForm").on("submit", async (event) => {
      event.preventDefault();
      const data = await this.submitTriggerEvent(event);
      await this.handlePagination(data);
    });

    // Ambil data jika form belum disubmit
    try {
      let allAccommodations = await this.getData();
      await this.handlePagination(allAccommodations);
    } catch (error) {
      return;
    }
  }
}

export default PencarianPage;

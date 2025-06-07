import { visibleNavbarAndFooter } from "../../utils/auth";
import PencarianPresenter from "./pencarian-presenter";
import { errorHandling, successHandling } from "../../utils";

export default class PencarianPage {
  #presenterPage = null;
  async render() {
    return `
      <section id='pencarian' class="container text-center text-lg-start" style='padding-top: 8rem;'>
        <div class="container">
                <div class="jelajahi">
                    <h1 style="font-size: 36px; font-weight: 900">
                        Jelajahi Penginapan
                    </h1>
                    <form id='pencarianForm' method="GET" class="search-form mt-4 row">
                      <div class="col-12 d-flex gap-2 mb-4" style="height: 50px;">
                        <select id='groupBy' class="form-select w-25" aria-label="Select groupBy for search">
                          <option selected>--groupBy--</option>
                          <option value="provinces">Provinsi</option>
                          <option value="location">Location</option>
                          <option value="3">Three</option>
                        </select>
                        <select id='resultBy' class="form-select w-25" disabled aria-label="Select groupBy for search">
                          <option selected>--resultBy--</option>
                        </select>
                      </div>
                      <div class="input-group col-12" style="height: 50px;">
                          <input type="text" name="pencarian" class="form-control" placeholder="Cari penginapan berdasarkan nama wisata...">
                          <button type="submit" class="btn btn-custom">Cari</button>
                      </div>
                    </form>
                </div>

                <div class="album py-5">
                    <div  class="container">
                        <div id='penginapan-container' class="row g-3">
                            
                        </div>



                        <!-- Add pagination links -->
                        <div id='pagination-container' class="pagination justify-content-center mt-5">
                            
                        </div>
                    </div>
                </div>
        </div>
      </section>
    `;
  }

  async template(allAccommodations, data) {
    return await this.sortedAccomodation(allAccommodations, data);
  }

  // async validateImage(img) {
  //   console.log("jalan");
  //   let validImage = "https://imageplaceholder.net/408x272?text=No+Image";
  //   if (Array.isArray(img)) {
  //     for (const url of img) {
  //       const isValid = await this.#presenterPage.validateImagePresenter(url);
  //       if (isValid) {
  //         validImage = url;
  //         break;
  //       }
  //     }
  //   }
  //   return validImage;
  // }

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

    // Generate HTML for current page items
    let html = "";
    datas.forEach(async (item) => {
      // let validImage = await this.validateImage(item.foto);

      html += `
        <div id="tour-${item.id}" class="col">
          <div class="card shadow">
            <div class="image">
              <img src="https://imageplaceholder.net/600x400/eeeeee/131313?text=Your+Image" class="card-img-top" alt="gambar">
            </div>
            <div class="card-body">
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
                  <a id='button-cart' data-id='${
                    item.id
                  }' class="btn btn-custom">
                      <i class="fas fa-calendar-check me-2"></i>Detail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  async renderProvinces(datas) {
    let html = "";
    datas.forEach(async (item) => {
      html += `
        <option value="${item}">${item}</option>
      `;
    });
    return html;
  }

  async sortedAccomodation(allAccommodations, data) {
    allAccommodations.sort((a, b) => a.nama.localeCompare(b.nama));
    return await this.calculateCurrentPages(allAccommodations, data);
  }

  async getData(groupBy = null) {
    // Sample data for all accommodations
    this.#presenterPage = new PencarianPresenter({ pencarianPage: this });
    const allAccommodations = await this.#presenterPage.getAllAccomodations();
    if (allAccommodations.length === 0) {
      return false;
    }

    return allAccommodations;
  }

  async getProvinces(data) {
    this.#presenterPage = new PencarianPresenter({ pencarianPage: this });
    const provinces = await this.#presenterPage.getProvinces(data);
    return provinces;
  }
  async calculateCurrentPages(datas, data) {
    // Calculate the current page items (3 items per page)
    const itemsPerPage = 3;
    const startIndex = (data[0] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = datas.slice(startIndex, endIndex);
    return await this.renderTemplate(currentItems);
  }

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
          message: error.response.data.message,
          error: error.response.data.error,
        };

        if (errJson.status >= 400) {
          errorHandling(errJson.error, errJson.message);
        }
      } else {
        errorHandling("Error!", error.message);
      }
    }
  }

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

  async afterRender() {
    // tampilkan navbar
    visibleNavbarAndFooter();

    // import jquery
    const $ = require("jquery");
    window.jQuery = $;
    await require("paginationjs");

    // menentukan group by dan meremve attr diabled di result by
    $("#groupBy").on("change", async (event) => {
      const allProvinces = await this.getProvinces(event.target.value);
      const html = await this.renderProvinces(allProvinces);
      $("#resultBy").html(html);
      $("#resultBy").removeAttr("disabled");
    });

    // ambil semua accomodation
    const allAccommodations = await this.getData();

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
        console.log(pagination, data);
        // template method of yourself
        let html = await this.template(allAccommodations, data);
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
        } else {
          $("#penginapan-container").addClass(
            "row-cols-1 row-cols-sm-2 row-cols-md-3"
          );
        }
        $("#penginapan-container").html(html);
        return;
      },
    });
  }
}

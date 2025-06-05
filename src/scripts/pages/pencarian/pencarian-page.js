import { visibleNavbarAndFooter } from "../../utils/auth";

export default class PencarianPage {
  async render() {
    return `
      <section id='pencarian' class="container text-center text-lg-start" style='padding-top: 8rem;'>
        <div class="container">
                <div class="jelajahi">
                    <h1 style="font-size: 36px; font-weight: 900">
                        Jelajahi Penginapan
                    </h1>
                    <form id='pencarianForm' method="GET" class="search-form mt-4">
                        <div class="input-group" style="height: 50px;">
                            <select id='category' class="form-select" aria-label="Select category for search">
                              <option selected>Category</option>
                              <option value="rating">Rating</option>
                              <option value="location">Location</option>
                              <option value="3">Three</option>
                            </select>
                            <input type="text" name="pencarian" class="form-control" placeholder="Cari penginapan berdasarkan nama wisata...">
                            <button type="submit" class="btn btn-custom">Cari</button>
                        </div>
                    </form>
                </div>

                <div class="album py-5">
                    <div  class="container">
                        <div id='data-container' class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="penginapan-container">
                            
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

  async template(data) {
    return await this.getData(data);
  }

  async renderTemplate(datas) {
    // Generate HTML for current page items
    let html = "";
    datas.forEach((item) => {
      html += `
        <div class="col">
          <div class="card shadow">
            <div class="image">
              <img src="${item.image}" class="card-img-top" alt="gambar">
            </div>
            <div class="card-body">
              <div class="kepala">
                <button type="button" class="btn btn-outline-primary btn-sm" disabled="">
                  ${item.location}
                </button>
                <small class="text-body-secondary">
                  Tersedia <b style="color: red;">${item.rooms} kamar</b>
                </small>
              </div>
              <div class="deskripsi">
                <h4 class="card-title-bold">${item.name}</h4>
                <h6 class="d-flex">Harga: ${item.price}</h6>
              </div>
              <div class="d-flex justify-content-start mt-3">
                <a href="${item.detailLink}" class="btn btn-custom">Detail</a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  async getData(data) {
    // Sample data for all accommodations
    const allAccommodations = [
      {
        name: "Argo Villa",
        price: "Rp 300000",
        location: "Denpasar",
        rooms: 8,
        image: "/static/penginapan_images/argo_villa_penginapan.jpg",
        detailLink: "/detail_customer/657f612b5faa5a9ff79fc9df",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
      {
        name: "Asri Villa",
        price: "Rp 400000",
        location: "Kuta",
        rooms: 12,
        image: "/static/penginapan_images/asri_villa_penginapan.jpg",
        detailLink: "/detail_customer/6580d7f9bea89c1d297e40bb",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
      {
        name: "Bali Vill",
        price: "Rp 300000",
        location: "Pandawa",
        rooms: 9,
        image: "/static/penginapan_images/bali_vill_penginapan.jpg",
        detailLink: "/detail_customer/6580d876bea89c1d297e40bc",
      },
    ];

    return await this.calculateCurrentPages(allAccommodations, data);
  }

  async calculateCurrentPages(datas, data) {
    // Calculate the current page items (3 items per page)
    const itemsPerPage = 3;
    const startIndex = (data[0] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = datas.slice(startIndex, endIndex);

    return await this.renderTemplate(currentItems);
  }

  async afterRender() {
    // tampilkan navbar
    visibleNavbarAndFooter();

    // import jquery
    const $ = require("jquery");
    window.jQuery = $;
    await require("paginationjs");

    $("#pagination-container").pagination({
      dataSource: Array.from({ length: 195 }, (_, i) => i + 1),
      pageRange: 0,
      pageSize: 1,
      className: "paginationjs paginationjs-theme-system paginationjs-big",
      autoHidePrevious: true,
      autoHideNext: true,
      callback: async (data, pagination) => {
        console.log(pagination, data);
        // template method of yourself
        var html = await this.template(data);
        $("#data-container").html(html);
      },
    });
  }
}

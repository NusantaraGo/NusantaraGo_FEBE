import { parseActivePathname } from '../../routes/url-parser';
import DetailPresenter from './detail-presenter';
import { errorHandling } from '../../utils'; // <-- Impor fungsi error handling

class DetailPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    // Metode render() hanya menampilkan kerangka loading awal
    return `
      <div class="container text-center mt-5">
        <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="lead mt-3">Memeriksa autentikasi dan memuat data...</p>
      </div>
    `;
  }

  async afterRender() {
    const mainContent = document.querySelector('#main-content');
    const pathSegments = parseActivePathname();
    const placeId = pathSegments.id;

    // PERUBAHAN: Teruskan 'this' (instance DetailPage) sebagai 'view' ke Presenter
    this._presenter = new DetailPresenter({ 
      view: this, 
      placeId: placeId 
    });

    // Minta presenter untuk membangun HTML, yang sekarang termasuk proses cek login
    mainContent.innerHTML = await this._presenter.buildHtmlForPage();
  }

  // --- TAMBAHAN BARU: Metode untuk menangani error dari Presenter ---
  // Sama seperti yang Anda punya di halaman lain
  async errorHandlerFetch(error) {
    console.error("Error di DetailPage:", error);
    if (error.code === "ECONNABORTED") {
      errorHandling(
        "Timeout Error!",
        "Terjadi kesalahan dalam pengiriman data. Mohon coba lagi."
      );
    } else if (error.response) {
      const errJson = {
        status: error.response.status,
        message: error.response.data.message || 'Terjadi kesalahan dari server.',
        error: error.response.data.error || 'Error Tidak Diketahui',
      };

      // Untuk error 401 (Unauthorized), presenter sudah menangani redirect,
      // kita tidak perlu menampilkan popup error tambahan agar tidak duplikat.
      if (errJson.status !== 401) {
        errorHandling(errJson.error, errJson.message);
      }
    } else {
      errorHandling("Error!", error.message);
    }
  }
}

export default DetailPage;
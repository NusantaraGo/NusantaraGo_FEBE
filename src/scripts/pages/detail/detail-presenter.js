import { getPlaceDetailById, getData } from '../../data/api';
import CONFIG from '../../config';

class DetailPresenter {
  constructor({ view, placeId }) {
    this._view = view;
    this._placeId = placeId;
  }

  async #checkAuthentication() {
    try {
      await getData(undefined, undefined, "/auth/get-user");
      return true; 
    } catch (error) {
      await this._view.errorHandlerFetch(error);
      // Redirect ke halaman login
      window.location.replace("#/login");
      return false; // Gagal, user belum login
    }
  }

  // Metode untuk membuat HTML detail (tidak ada perubahan)
  _createDetailHtml(place) {
    const { nama, alamat, provinsi, rating, jumlah_review, deskripsi, foto, kategori, koordinat } = place;
    const { latitude, longitude } = koordinat;
    const imagePath = foto.startsWith('/') ? foto.slice(1) : foto;
    const imageUrl = `${CONFIG.ML_URL_API}/${imagePath}`;
    const bbox_pad = 0.005;
    const bbox = `${longitude - bbox_pad},${latitude - bbox_pad},${longitude + bbox_pad},${latitude + bbox_pad}`;
    const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
    const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

    return `
      <div class="container mt-4 mb-5">
        <div class="detail-page-card">
            {...} // Template HTML lengkap seperti sebelumnya
        </div>
      </div>
    `;
  }

  // Metode untuk membuat HTML error (tidak ada perubahan)
  _createErrorHtml(status, message) {
    return `
      <div class="container mt-5 text-center">
        <div class="alert alert-danger" role="alert">
          <h4 class="alert-heading">Oops! Terjadi Kesalahan (Error ${status || ''})</h4>
          <p>${message || 'Gagal memuat detail tempat wisata.'}</p>
          <hr>
          <p class="mb-0">Silakan kembali ke <a href="#/pencarian" class="alert-link">Halaman Pencarian</a>.</p>
        </div>
      </div>
    `;
  }

  // Metode utama yang diubah untuk menyertakan pengecekan login
  async buildHtmlForPage() {
    // LANGKAH 1: Lakukan pengecekan login terlebih dahulu
    const isLoggedIn = await this.#checkAuthentication();

    // Jika tidak login, proses sudah dihentikan oleh #checkAuthentication (redirect).
    // Kita kembalikan string kosong agar tidak ada konten yang sempat ditampilkan.
    if (!isLoggedIn) {
      return '';
    }

    // LANGKAH 2: Jika berhasil login, lanjutkan ke logika yang sudah ada
    if (!this._placeId) {
      return this._createErrorHtml(400, 'ID tempat wisata tidak valid atau tidak ditemukan di URL.');
    }

    try {
      const placeData = await getPlaceDetailById(this._placeId);
      if (placeData) {
        return this._createDetailHtml(placeData);
      } else {
        throw new Error('Format data dari API tidak sesuai atau data kosong.');
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : error.message;
      const errorStatus = error.response ? error.response.status : 500;
      return this._createErrorHtml(errorStatus, errorMessage);
    }
  }
}

export default DetailPresenter;
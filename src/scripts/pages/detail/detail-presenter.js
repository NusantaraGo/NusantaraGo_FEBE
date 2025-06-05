import { getPlaceDetailById } from '../../data/api';

class DetailPresenter {
  constructor({ placeId }) {
    this._placeId = placeId;
  }

  _createDetailHtml(place) {
    const {
      nama, alamat, provinsi, rating, jumlah_review, deskripsi, foto, kategori, koordinat,
    } = place;
    const { latitude, longitude } = koordinat;

    // URL untuk embed peta OpenStreetMap
    const bbox_pad = 0.005;
    const bbox = `${longitude - bbox_pad},${latitude - bbox_pad},${longitude + bbox_pad},${latitude + bbox_pad}`;
    const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
    const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

    return `
      <div class="container mt-4 mb-5">
        <div class="detail-page-card">
          <div class="row g-0">
            <div class="col-lg-7">
              <img 
                src="${foto[0]}" 
                alt="Gambar ${nama}" 
                class="img-fluid detail-place-image"
                onerror="this.onerror=null;this.src='./images/placeholder-detail.jpg';"
              >
            </div>

            <div class="col-lg-5 d-flex flex-column">
              <div class="p-4 p-md-4 detail-info-panel">
                <h1 class="place-name mb-3">${nama}</h1>
                <div class="place-meta mb-3">
                  <p class="meta-item"><i class="bi bi-geo-alt-fill"></i> ${alamat}, ${provinsi}</p>
                </div>
                <div class="rating-section">
                  <span class="rating-value"><i class="bi bi-star-fill"></i> ${rating}</span>
                  <span class="review-count">(${jumlah_review} reviews)</span>
                </div>
                <div class="category-section mt-3">
                  ${kategori.map(cat => `<span class="badge bg-success">${cat}</span>`).join(' ')}
                </div>
              </div>
            </div>
          </div>

          <div class="row g-0">
            <div class="col-12 p-4 p-md-5">
              <h2 class="detail-section-title">Deskripsi</h2>
              <p class="place-description mt-2 mb-4">${deskripsi}</p>
              
              <h2 class="detail-section-title">Lokasi di Peta</h2>
              <div class="map-container mt-3">
                <iframe
                  width="100%"
                  height="450"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="${osmEmbedUrl}"
                  style="border: 1px solid black; border-radius: 8px;"
                ></iframe>
              </div>
              <a href="${osmUrl}" class="btn btn-outline-success mt-3" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-arrows-fullscreen"></i> Buka di Peta Ukuran Penuh
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }


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

  async buildHtmlForPage() {
    if (!this._placeId) {
      return this._createErrorHtml(400, 'ID tempat wisata tidak valid atau tidak ditemukan di URL.');
    }

    try {
      const place = await getPlaceDetailById(this._placeId);
      return this._createDetailHtml(place);
    } catch (error) {
      return this._createErrorHtml(error.status, error.message);
    }
  }
}

export default DetailPresenter;
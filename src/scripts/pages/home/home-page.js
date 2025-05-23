import { visibleNavbarAndFooter } from "../../utils/auth";

export default class HomePage {
  async render() {
    return `
      <section class="container py-5">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="fw-bold display-5">Spend Wisely<br>during Vacation to <span class="text-primary">Bali</span></h1>
            <p class="mt-3 fs-5">
              NusantaraGo memudahkan wisatawan menemukan destinasi terbaik di Indonesia. 
              Jelajahi Nusantara tanpa bingung menentukan tujuan!
            </p>
            <button id="explore-button" class="btn btn-dark btn-lg mt-3">Mulai Eksplorasi</button>
          </div>
          <div class="col-md-6 text-center mt-4 mt-md-0">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Bali Sunset" class="img-fluid rounded shadow" style="max-height: 350px;">
          </div>
        </div>
      </section>

      <section class="bg-light py-5">
        <div class="container">
          <h2 class="fw-bold text-center mb-5">Kenapa Pilih <span class="text-primary">NusantaraGO?</span></h2>
          <div class="row text-center g-4">
            <div class="col-md-4">
              <div class="p-4 shadow-sm rounded bg-white h-100">
                <i class="bi bi-geo-alt-fill fs-1 mb-3 text-primary"></i>
                <h5 class="fw-bold">Destinasi Lokal Berkualitas</h5>
                <p>Temukan rekomendasi destinasi wisata otentik di Indonesia, dari Sabang hingga Merauke.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-4 shadow-sm rounded bg-white h-100">
                <i class="bi bi-currency-dollar fs-1 mb-3 text-warning"></i>
                <h5 class="fw-bold">Konten Real-time dari sesama Pengguna</h5>
                <p> Sistem ulasan dan foto app kami berbasis real-time dari traveler manca negara hingga lokal, pramuwisata, dan duta wisata daerah.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-4 shadow-sm rounded bg-white h-100">
                <i class="bi bi-pin-map fs-1 mb-3 text-danger"></i>
                <h5 class="fw-bold">Rekomendasi Strategis</h5>
                <p>Pilih tempat wisata yang sesuai dengan preferensimu, Liburanmu bisa lebih hemat waktu dan biaya!</p>
              </div>
            </div>
          </div>

          <div class="row text-center mt-5 g-4">
            <div class="col-md-4">
              <img src="https://img.icons8.com/clouds/100/beach.png" />
              <p class="mt-2 fw-semibold">Nuansa Budaya Lokal</p>
            </div>
            <div class="col-md-4">
              <img src="https://img.icons8.com/color/100/hotel.png" />
              <p class="mt-2 fw-semibold">Akomodasi Beragam & Unik</p>
            </div>
            <div class="col-md-4">
              <img src="https://img.icons8.com/color/100/google-maps-new.png" />
              <p class="mt-2 fw-semibold">Navigasi Mudah & Interaktif</p>
            </div>
          </div>
        </div>
    `;
  }

  async afterRender() {

    await this.presenter.afterRender();

    // tampilkan navbar
    visibleNavbarAndFooter();
  }
}



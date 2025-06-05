import CONFIG from "../config";
import axios from "axios";
export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}

async function validateData(data_json, header_json, timeout, params) {
  if (typeof data_json !== "object" || Array.isArray(data_json)) {
    throw new TypeError("data_json harus berupa objek JSON.");
  }

  if (typeof header_json !== "object" || Array.isArray(header_json)) {
    throw new TypeError("header_json harus berupa objek header.");
  }

  if (typeof timeout !== "number") {
    throw new TypeError("timeout harus berupa angka (milidetik).");
  }

  if (timeout < 0) {
    throw new RangeError("timeout tidak boleh negatif.");
  }

  if (!params.includes("/")) {
    throw new Error("params tidak mengandung /");
  }
}

export async function postData(
  data_json,
  header_json = {
    "Content-Type": "application/json",
  },
  timeout = 10000, // 10 detik
  params = "/"
) {
  try {
    await validateData(data_json, header_json, timeout, params);
    const response = await axios.post(
      `${CONFIG["API_URL"]}${params}`,
      JSON.stringify(data_json),
      {
        headers: header_json,
        timeout: timeout,
        withCredentials: true, // <--- WAJIB agar cookie diterima dari Hapi
      }
    );
    if (response.status <= 400) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export async function patchData(
  data_json,
  header_json = {
    "Content-Type": "application/json",
  },
  timeout = 10000, // 10 detik
  params = "/"
) {
  try {
    await validateData(data_json, header_json, timeout, params);
    const response = await axios.patch(
      `${CONFIG["API_URL"]}${params}`,
      JSON.stringify(data_json),
      {
        headers: header_json,
        timeout: timeout,
        withCredentials: true, // <--- WAJIB agar cookie diterima dari Hapi
      }
    );
    if (response.status <= 400) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

const jsonData = [
  {
    "id": 1,
    "nama": "Pantai Tebing Lampuuk",
    "alamat": "Meunasah Balee, Kec. Lhoknga",
    "rating": "4.6",
    "jumlah_review": "758",
    "deskripsi": "Pantai Tebing Lampuuk, yang terletak di Kec. Lhoknga, Aceh Besar, menawarkan pengalaman wisata pantai yang unik dengan perpaduan tebing, pasir, dan laut yang indah. Pantai ini memiliki pasir putih yang halus, air laut yang jernih, dan tebing-tebing curam yang menjadi daya tarik tersendiri, terutama saat matahari terbenam.",
    "koordinat": { "latitude": 5.4970038, "longitude": 95.227854 },
    "url": "https://www.google.com/maps/place/Pantai+Tebing+Lampuuk/data=!4m7!3m6!1s0x30403ad55fbd44a9:0x55781902cf72b99a!8m2!3d5.4970038!4d95.227854!16s%2Fg%2F11fy4jfvk_!19sChIJqUS9X9U6QDARmrlyzwIZeFU?authuser=0&hl=id&rclk=1",
    "provinsi": "Aceh",
    "foto": [
      "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npCKu2SYkNcbYR3cXnjqV1UROeWICN4WfT9KL2-la58bEQEdpzipHttb4TJhbp8e4rXNQaz1rQA8j5rrhgMOkKEPY3CJiyvpwGlQosSivvL2LuWzwMAVEN3d8BrelfHu2Wv0ly0=w408-h306-k-no",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npCKu2SYkNcbYR3cXnjqV1UROeWICN4WfT9KL2-la58bEQEdpzipHttb4TJhbp8e4rXNQaz1rQA8j5rrhgMOkKEPY3CJiyvpwGlQosSivvL2LuWzwMAVEN3d8BrelfHu2Wv0ly0=w397-h298-k-no"
    ],
    "kategori": ["pantai"]
  },
  {
    "id": 2,
    "nama": "Pantai Sawang",
    "alamat": "Sawang, Kec. Samudera, Aceh",
    "rating": "3.6",
    "jumlah_review": "31",
    "deskripsi": "Pantai Sawang atau yang dikenal juga dengan nama Pantai SBB (Sawang Biduak Buruak) adalah pantai yang indah dan populer di Labuhan Haji, Aceh Selatan. Pantai ini terkenal dengan pasir putih yang lembut dan ombaknya yang tenang, sehingga aman untuk berenang dan bermain air.",
    "koordinat": { "latitude": 5.1545321, "longitude": 97.2442516 },
    "url": "https://www.google.com/maps/place/Pantai+Sawang/data=!4m7!3m6!1s0x3047854791be3f41:0xea165b40b93b3fa0!8m2!3d5.1545321!4d97.2442516!16s%2Fg%2F11hz0sq4wz!19sChIJQT--kUeFRzARoD87uUBbFuo?authuser=0&hl=id&rclk=1",
    "provinsi": "Aceh",
    "foto": [
      "https://images.unsplash.com/photo-1540202404-1b927e27f287?q=80&w=1287&auto=format&fit=crop",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrLldmMQzqXi3gchiQj6Cb9CFNTaCbchZJahbtyQWcvIVWIZU-Vhgl4CXoV6htH5WN4v20bWbW7tlmoDVx93kIx62bCLKEVbh4Qn4u3JLpD2y1M4SeYT3rOTCoUYhCG-84F4Yrw=w408-h544-k-no",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrLldmMQzqXi3gchiQj6Cb9CFNTaCbchZJahbtyQWcvIVWIZU-Vhgl4CXoV6htH5WN4v20bWbW7tlmoDVx93kIx62bCLKEVbh4Qn4u3JLpD2y1M4SeYT3rOTCoUYhCG-84F4Yrw=w224-h298-k-no"
    ],
    "kategori": ["pantai"]
  },
  {
    "id": 3,
    "nama": "Nol Kilometer Kota Banda Aceh",
    "alamat": "Gampong Pande, Kec. Kuta Raja, Aceh",
    "rating": "4.4",
    "jumlah_review": "661",
    "deskripsi": "Tugu Nol Kilometer Kota Banda Aceh adalah sebuah tempat wisata sejarah yang terletak di Gampong Pande, Kecamatan Kutaraja, Kota Banda Aceh. Tempat ini menandai titik awal mula berdirinya Kota Banda Aceh pada tanggal 22 April 1205 M. Di sini, pengunjung dapat bersantai, berfoto, dan menikmati pemandangan pantai.",
    "koordinat": { "latitude": 5.5826227, "longitude": 95.3141429 },
    "url": "https://www.google.com/maps/place/Nol+Kilometer+Kota+Banda+Aceh/data=!4m7!3m6!1s0x3040372f3fffffff:0xd42c49b36829cca3!8m2!3d5.5826227!4d95.3141429!16s%2Fg%2F11b6mcvhfg!19sChIJ____Py83QDARo8wpaLNJLNQ?authuser=0&hl=id&rclk=1",
    "provinsi": "Aceh",
    "foto": [
      "https://images.unsplash.com/photo-1618037508658-5527f30d06ff?q=80&w=1364&auto=format&fit=crop",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noez4l3Nt-Cyqw-FyW3GZljY0jcWMtbMslRG8Rhodh5mtVSsUMcc3cqEWM4CiE7uaZtEPPQ-babr4pD1bJ6y-i9P2_k0deoEoNcVtPdLQZwCq9rg9CjLZxOxyL9XAgvHC0OBQVRBQ=w408-h306-k-no",
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noez4l3Nt-Cyqw-FyW3GZljY0jcWMtbMslRG8Rhodh5mtVSsUMcc3cqEWM4CiE7uaZtEPPQ-babr4pD1bJ6y-i9P2_k0deoEoNcVtPdLQZwCq9rg9CjLZxOxyL9XAgvHC0OBQVRBQ=w397-h298-k-no"
    ],
    "kategori": ["lainnya"]
  }
];

const mockPlaceData = jsonData.reduce((acc, place) => {
  acc[place.id] = place;
  return acc;
}, {});

// src/scripts/api.js
// ... (kode Anda yang sudah ada di atas)

// --- Mulai penambahan fungsi baru ---

export async function getAllPlaces() {
  // Dalam skenario nyata, ini akan memanggil endpoint API seperti /places atau /destinations
  // const response = await getData(`${CONFIG.API_URL}/places`);
  // return response.data; // atau format lain sesuai API Anda

  // Untuk sekarang, kita gunakan mock data yang sudah ada
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mengambil semua nilai dari objek mockPlaceData menjadi sebuah array
      const allPlaces = Object.values(mockPlaceData);
      resolve(allPlaces);
    }, 200); // Simulasi delay jaringan
  });
}
// --- Selesai penambahan fungsi baru ---

export async function getPlaceDetailById(id) {
  // In a real scenario, you would fetch from your backend:
  // try {
  //   // Assuming your getData can handle full URLs or you construct it with CONFIG.API_URL
  //   // const response = await getData(`${CONFIG.API_URL}/places/${id}`); // or axios.get
  //   // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //   // return await response.json(); // or response.data if using axios
  // } catch (error) {
  //   console.error(`API Error fetching place ${id}:`, error);
  //   throw error; // Re-throw to be handled by Presenter
  // }

  // Mock implementation:
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockPlaceData[id]) {
        resolve(mockPlaceData[id]);
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ status: 404, message: `Tempat wisata dengan ID "${id}" tidak ditemukan.` });
      }
    }, 300); // Simulate network delay
  });
}
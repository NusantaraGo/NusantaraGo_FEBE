import CONFIG from "../config";
import axios from "axios";
export async function getDataML(
  timeout = 3000, // 3000 milidetik = 3 detik
  params = "/",
  filteredData = null
) {
  try {
    const response = await axios.get(`${CONFIG["ML_URL_API"]}${params}`, {
      params: filteredData,
      timeout: timeout,
    });
    if (response.status <= 400) {
      return response.data;
    } else {
      throw new Error("Gagal mengambil data dari API.");
    }
  } catch (error) {
    throw error;
  }
}

// export async function validateImage(url) {
//   try {
//     const response = await axios.head(url, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
//         Accept:
//           "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
//       },
//       timeout: 3000, // hindari lama request
//     });
//     const contentType = response.headers["content-type"];
//     return (
//       response.status === 200 && contentType && contentType.startsWith("image/")
//     );
//   } catch (err) {
//     throw err;
//   }
// }

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
      `${CONFIG["AUTH_URL_API"]}${params}`,
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
      `${CONFIG["AUTH_URL_API"]}${params}`,
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
        reject({
          status: 404,
          message: `Tempat wisata dengan ID "${id}" tidak ditemukan.`,
        });
      }
    }, 300); // Simulate network delay
  });
}

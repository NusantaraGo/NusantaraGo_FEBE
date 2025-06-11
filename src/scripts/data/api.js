// import CONFIG from "../config";
// import axios from "axios";

// /**
//  * Mengembalikan objek yang dihapus propertinya jika nilai dari properti tersebut
//  * adalah string kosong.
//  * @param {object} obj - Objek yang akan dihapus propertinya.
//  * @returns {Promise<object>} Objek yang sudah dihapus propertinya.
//  */
// async function removeEmpty(obj) {
//   return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
// }

// async function validateData(data_json, header_json, timeout, params) {
//   if (typeof data_json !== "object" || Array.isArray(data_json)) {
//     throw new TypeError("data_json harus berupa objek JSON.");
//   }

//   if (typeof header_json !== "object" || Array.isArray(header_json)) {
//     throw new TypeError("header_json harus berupa objek header.");
//   }

//   if (typeof timeout !== "number") {
//     throw new TypeError("timeout harus berupa angka (milidetik).");
//   }

//   if (timeout < 0) {
//     throw new RangeError("timeout tidak boleh negatif.");
//   }

//   if (!params.includes("/")) {
//     throw new Error("params tidak mengandung /");
//   }
// }

// export async function getDataML(
//   timeout = 5000, // 3000 milidetik = 3 detik
//   params = "/",
//   filteredData = null
// ) {
//   try {
//     /* The code snippet `let filteredParams = {};` initializes an empty object called `filteredParams`. */
//     let filteredParams = {};
//     if (filteredData) {
//       filteredParams = await removeEmpty(filteredData);
//     }

//     /* The code snippet you provided is making an HTTP GET request using Axios to a specific URL
//     constructed from `CONFIG["ML_URL_API"]` and `params`. It includes additional configurations such
//     as passing `filteredParams` as query parameters, setting a timeout for the request, and handling
//     the response. */
//     const response = await axios.get(`${CONFIG["ML_URL_API"]}${params}`, {
//       params: filteredParams,
//       timeout: timeout,
//     });
//     if (response.status <= 400) {
//       return response.data;
//     } else {
//       throw new Error("Gagal mengambil data dari API.");
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// // --- Mulai penambahan fungsi baru ---

// export async function getAllPlaces() {
//   // Dalam skenario nyata, ini akan memanggil endpoint API seperti /places atau /destinations
//   // const response = await getData(`${CONFIG.API_URL}/places`);
//   // return response.data; // atau format lain sesuai API Anda

//   // Untuk sekarang, kita gunakan mock data yang sudah ada
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Mengambil semua nilai dari objek mockPlaceData menjadi sebuah array
//       const allPlaces = Object.values(mockPlaceData);
//       resolve(allPlaces);
//     }, 200); // Simulasi delay jaringan
//   });
// }
// // --- Selesai penambahan fungsi baru ---

// export async function getPlaceDetailById(id) {
//   // In a real scenario, you would fetch from your backend:
//   // try {
//   //   // Assuming your getData can handle full URLs or you construct it with CONFIG.API_URL
//   //   // const response = await getData(`${CONFIG.API_URL}/places/${id}`); // or axios.get
//   //   // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//   //   // return await response.json(); // or response.data if using axios
//   // } catch (error) {
//   //   console.error(`API Error fetching place ${id}:`, error);
//   //   throw error; // Re-throw to be handled by Presenter
//   // }

//   // Mock implementation:
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (mockPlaceData[id]) {
//         resolve(mockPlaceData[id]);
//       } else {
//         // eslint-disable-next-line prefer-promise-reject-errors
//         reject({
//           status: 404,
//           message: `Tempat wisata dengan ID "${id}" tidak ditemukan.`,
//         });
//       }
//     }, 300); // Simulate network delay
//   });
// }

// // export async function validateImage(url) {
// //   try {
// //     const response = await axios.head(url, {
// //       headers: {
// //         "User-Agent":
// //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
// //         Accept:
// //           "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
// //       },
// //       timeout: 3000, // hindari lama request
// //     });
// //     const contentType = response.headers["content-type"];
// //     return (
// //       response.status === 200 && contentType && contentType.startsWith("image/")
// //     );
// //   } catch (err) {
// //     throw err;
// //   }
// // }

// // auth api
// /**
//  * Sends data to the API using the POST method.
//  * @param {object} data_json - The JSON data to be sent.
//  * @param {object} [header_json={"Content-Type": "application/json"}] - The headers for the request.
//  * @param {number} [timeout=10000] - The timeout for the request in milliseconds.
//  * @param {string} [params="/"] - The URL parameters to be used.
//  * @returns {Promise<object>} - The response data from the API.
//  * @throws Will throw an error if the request fails.
//  */

// export async function postData(
//   data_json,
//   header_json = {
//     "Content-Type": "application/json",
//   },
//   timeout = 10000, // 10 detik
//   params = "/"
// ) {
//   try {
//     await validateData(data_json, header_json, timeout, params);
//     const response = await axios.post(
//       `${CONFIG["AUTH_URL_API"]}${params}`,
//       JSON.stringify(data_json),
//       {
//         headers: header_json,
//         timeout: timeout,
//         withCredentials: true, // <--- WAJIB agar cookie diterima dari Hapi
//       }
//     );
//     if (response.status <= 400) {
//       return response.data;
//     }
//   } catch (error) {
//     throw error;
//   }
// }
// /**
//  * Mengirimkan data ke API menggunakan metode PATCH.
//  * @param {object} data_json - Data yang dikirimkan dalam format JSON.
//  * @param {object} [header_json] - Header yang dikirimkan. Defaultnya adalah
//  *   `{"Content-Type": "application/json"}`.
//  * @param {number} [timeout] - Waktu tunggu dalam milidetik. Defaultnya adalah
//  *   10 detik.
//  * @param {string} [params] - Parameter URL yang dikirimkan. Defaultnya adalah
//  *   "/".
//  * @returns {Promise<object>} - Respon dari API.
//  */

// export async function putData(
//   data_json,
//   header_json = {
//     "Content-Type": "application/json",
//   },
//   timeout = 10000, // 10 detik
//   params = "/"
// ) {
//   try {
//     await validateData(data_json, header_json, timeout, params);
//     const response = await axios.put(
//       `${CONFIG["AUTH_URL_API"]}${params}`,
//       JSON.stringify(data_json),
//       {
//         headers: header_json,
//         timeout: timeout,
//         withCredentials: true, // <--- WAJIB agar cookie diterima dari Hapi
//       }
//     );
//     if (response.status <= 400) {
//       return response.data;
//     }
//   } catch (error) {
//     throw error;
//   }
// }

// export async function patchData(
//   data_json,
//   header_json = {
//     "Content-Type": "application/json",
//   },
//   timeout = 10000, // 10 detik
//   params = "/"
// ) {
//   try {
//     await validateData(data_json, header_json, timeout, params);
//     const response = await axios.patch(
//       `${CONFIG["AUTH_URL_API"]}${params}`,
//       JSON.stringify(data_json),
//       {
//         headers: header_json,
//         timeout: timeout,
//         withCredentials: true, // <--- WAJIB agar cookie diterima dari Hapi
//       }
//     );
//     if (response.status <= 400) {
//       return response.data;
//     }
//   } catch (error) {
//     throw error;
//   }
// }
// // end

// // my profile
// export async function getData(
//   header_json = {
//     "Content-Type": "application/json",
//   },
//   timeout = 10000, // 10 detik
//   params = "/"
// ) {
//   try {
//     const response = await axios.get(`${CONFIG["AUTH_URL_API"]}${params}`, {
//       headers: header_json,
//       timeout: timeout,
//       withCredentials: true,
//     });

//     console.log(response);

//     if (response.status <= 400) {
//       return response.data;
//     } else {
//       throw new Error("Gagal mengambil data dari API.");
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

import CONFIG from "../config";
import axios from "axios";

/**
 * Mengembalikan objek yang dihapus propertinya jika nilai dari properti tersebut
 * adalah string kosong.
 * @param {object} obj - Objek yang akan dihapus propertinya.
 * @returns {Promise<object>} Objek yang sudah dihapus propertinya.
 */
async function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ""));
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

export async function getDataML(
  timeout = 5000, // 3000 milidetik = 3 detik
  params = "/",
  filteredData = null
) {
  try {
    /* The code snippet `let filteredParams = {};` initializes an empty object called `filteredParams`. */
    let filteredParams = {};
    if (filteredData) {
      filteredParams = await removeEmpty(filteredData);
    }

    /* The code snippet you provided is making an HTTP GET request using Axios to a specific URL
    constructed from `CONFIG["ML_URL_API"]` and `params`. It includes additional configurations such
    as passing `filteredParams` as query parameters, setting a timeout for the request, and handling
    the response. */
    const response = await axios.get(`${CONFIG["ML_URL_API"]}${params}`, {
      params: filteredParams,
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

// --- Mulai penambahan fungsi baru ---

export async function getAllPlaces() {
  try {
    const response = await axios.get(`${CONFIG.ML_URL_API}/api/attractions`);
    if (response.status === 200) {
      // API mengembalikan array di dalam properti "data"
      return response.data;
    } else {
      throw new Error("Gagal mengambil daftar destinasi.");
    }
  } catch (error) {
    console.error("API Error saat mengambil semua tempat wisata:", error);
    throw error;
  }
}

export async function getPlaceDetailById(id) {
  try {
    // Langkah 1: Ambil semua data wisata untuk menemukan nama berdasarkan ID
    const allPlaces = await getAllPlaces();
    if (!allPlaces || allPlaces.length === 0) {
      throw new Error('Daftar tempat wisata tidak tersedia.');
    }

    // Konversi ID dari URL (string) ke angka untuk perbandingan
    const numericId = parseInt(id, 10);
    const place = allPlaces.find(p => p.id === numericId);

    if (!place) {
      throw { status: 404, message: `Tempat wisata dengan ID "${id}" tidak ditemukan di daftar.` };
    }

    const placeName = place.nama;
    // encodeURIComponent penting untuk nama yang mengandung spasi atau karakter spesial
    const encodedName = encodeURIComponent(placeName);
    const response = await axios.get(`${CONFIG.ML_URL_API}/api/attraction/${encodedName}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Gagal mengambil detail untuk ${placeName}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`API Error saat proses mengambil detail untuk ID ${id}:`, error);
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

// auth api
/**
 * Sends data to the API using the POST method.
 * @param {object} data_json - The JSON data to be sent.
 * @param {object} [header_json={"Content-Type": "application/json"}] - The headers for the request.
 * @param {number} [timeout=10000] - The timeout for the request in milliseconds.
 * @param {string} [params="/"] - The URL parameters to be used.
 * @returns {Promise<object>} - The response data from the API.
 * @throws Will throw an error if the request fails.
 */

export async function postData(
  data_json,
  header_json = {
    "Content-Type": "application/json",
  },
  timeout = 10000, // 10 detik
  params = "/"
) {
  console.log(`${CONFIG["AUTH_URL_API"]}${params}`);
  try {
    await validateData(data_json, header_json, timeout, params);
    const response = await axios.post(
      `${CONFIG["AUTH_URL_API"]}${params}`,
      JSON.stringify(data_json),
      {
        headers: header_json,
        timeout: timeout,
        withCredentials: true,
      }
    );
    if (response.status <= 400) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}
/**
 * Mengirimkan data ke API menggunakan metode PATCH.
 * @param {object} data_json - Data yang dikirimkan dalam format JSON.
 * @param {object} [header_json] - Header yang dikirimkan. Defaultnya adalah
 *   `{"Content-Type": "application/json"}`.
 * @param {number} [timeout] - Waktu tunggu dalam milidetik. Defaultnya adalah
 *   10 detik.
 * @param {string} [params] - Parameter URL yang dikirimkan. Defaultnya adalah
 *   "/".
 * @returns {Promise<object>} - Respon dari API.
 */

export async function putData(
  data_json,
  header_json = {
    "Content-Type": "application/json",
  },
  timeout = 10000, // 10 detik
  params = "/"
) {
  try {
    await validateData(data_json, header_json, timeout, params);
    const response = await axios.put(
      `${CONFIG["AUTH_URL_API"]}${params}`,
      JSON.stringify(data_json),
      {
        headers: header_json,
        timeout: timeout,
        withCredentials: true,
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
        withCredentials: true,
      }
    );
    if (response.status <= 400) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}
// end

// my profile
export async function getData(
  header_json = {
    "Content-Type": "application/json",
  },
  timeout = 10000, // 10 detik
  params = "/"
) {
  try {
    const response = await axios.get(`${CONFIG["AUTH_URL_API"]}${params}`, {
      headers: header_json,
      timeout: timeout,
      withCredentials: true,
    });

    console.log(response);

    if (response.status <= 400) {
      return response.data;
    } else {
      throw new Error("Gagal mengambil data dari API.");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}


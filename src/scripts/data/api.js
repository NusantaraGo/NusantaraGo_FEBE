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
  timeout = 10000, // 10000 milidetik = 10 detik
  params = "/",
  filteredData = null
) {
  try {
    /* The code snippet `let filteredParams = {};` initializes an empty object called `filteredParams`. */
    let filteredParams = {};
    const base_url = CONFIG["ML_URL_API"];

    if (filteredData) {
      filteredParams = await removeEmpty(filteredData);
    }

    /* The code snippet you provided is making an HTTP GET request using Axios to a specific URL
    constructed from `CONFIG["ML_URL_API"]` and `params`. It includes additional configurations such
    as passing `filteredParams` as query parameters, setting a timeout for the request, and handling
    the response. */
    let response = await axios.get(`${base_url}${params}`, {
      params: filteredParams,
      timeout: timeout,
      contentType: "application/json",
    });

    if (response.status <= 400) {
      if (!response.data) {
        throw new Error("Data yang didapatkan kosong");
      }

      // buat key foto menjadi url/data-img
      response.data = response.data.map((item) => {
        if (item.foto) {
          return { ...item, foto: base_url + "/" + item.foto };
        } else {
          return item;
        }
      });

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
      throw new Error("Daftar tempat wisata tidak tersedia.");
    }

    // Konversi ID dari URL (string) ke angka untuk perbandingan
    const numericId = parseInt(id, 10);
    const place = allPlaces.find((p) => p.id === numericId);

    if (!place) {
      throw {
        status: 404,
        message: `Tempat wisata dengan ID "${id}" tidak ditemukan di daftar.`,
      };
    }

    const placeName = place.nama;
    // encodeURIComponent penting untuk nama yang mengandung spasi atau karakter spesial
    const encodedName = encodeURIComponent(placeName);
    const response = await axios.get(
      `${CONFIG.ML_URL_API}/api/attraction/${encodedName}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Gagal mengambil detail untuk ${placeName}. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      `API Error saat proses mengambil detail untuk ID ${id}:`,
      error
    );
    throw error;
  }
}

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

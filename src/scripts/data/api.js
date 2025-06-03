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

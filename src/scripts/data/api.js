import CONFIG from "../config";
import axios from "axios";
export async function getData() {
  const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
  return await fetchResponse.json();
}

export async function postData(
  data_json,
  header_json = {
    "Content-Type": "application/json",
  },
  timeout = 5000
) {
  try {
    const response = await axios.post(process.env.BASE_URL, data_json, {
      headers: header_json,
      timeout: timeout,
    });
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout");
    }
    throw error;
  }
}

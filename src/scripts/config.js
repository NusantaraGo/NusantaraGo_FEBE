const CONFIG = {
  API_URL: process.env.API_URL, //untuk api backend
};

if (!CONFIG.API_URL) {
  throw new Error(
    "API_URL is not defined. Check your .env and Webpack config."
  );
}

export default CONFIG;

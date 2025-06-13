const CONFIG = {
  AUTH_URL_API: process.env.API_URL1, //untuk api backend
  ML_URL_API: process.env.API_URL2,
};

if (!CONFIG.AUTH_URL_API || !CONFIG.ML_URL_API) {
  throw new Error(
    "API_URL is not defined. Check your .env and Webpack config."
  );
}

export default CONFIG;

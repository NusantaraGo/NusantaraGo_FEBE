const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader", // Inject CSS ke DOM
          "css-loader", // Ubah CSS ke modul JS
          "sass-loader", // Compile SCSS ke CSS
        ],
      },
    ],
  },
  plugins: [
    // akses .env
    new Dotenv({
      path: path.resolve(__dirname, ".env"), // opsional, default juga '.env'
      safe: false, // true jika pakai .env.example
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8080,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});

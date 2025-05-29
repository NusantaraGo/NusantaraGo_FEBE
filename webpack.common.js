const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    fallback: {
      process: require.resolve("process/browser"),
    },
  },
  plugins: [
    // generate index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
    // copy asset
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    // akses .env
    new Dotenv({
      path: "/.env", // default sebenarnya, bisa dihilangkan
    }),
    // plugin lain...
    new webpack.ProvidePlugin({
      process: "process/browser.js", // agar 'process' dikenali oleh browser
    }),
  ],
};

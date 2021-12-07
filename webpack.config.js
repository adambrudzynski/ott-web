const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] },
        },
        {
          test: /\.css$/,
          include: [/src/, /node_modules/],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
            },
          ],
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    devtool: "source-map",
    output: {
      publicPath: "/",
      filename: "app.js",
      path: path.join(__dirname, "/build"),
    },
    devServer: {
      host: "0.0.0.0",
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[id].css",
      }),
      new Dotenv(),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  };
};
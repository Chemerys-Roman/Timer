const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === 'development';

console.log(isDev);

module.exports = {
  context: path.resolve(__dirname, "src"),
  devtool: isDev ? 'source-map' : '',
  mode: "development",
  entry: {
    app: ["./js/app.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
  },
  plugins: [

    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "css/style.css" }),

  ],
  module: {
    rules: [

      { test: /\.(js|jsx|(m?js))$/, exclude: /node_modules/, use: ["babel-loader"], },
      {
        test: /\.css$/, use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          },
        }, "css-loader"],
      },
      { test: /\.s[ac]ss$/i, exclude: /node_modules/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader",], },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: '[path][name].[ext]',
          },
        },]
      },


    ],
  },


  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 3000,
    compress: true,
    overlay: true,
    stats: { modules: false, },
  }

};
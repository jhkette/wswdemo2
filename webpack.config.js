const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

module.exports = {
  // development mode
  mode: "production",
  // define entry file
  entry: "./js/main.js",
  // define output path -
  output: {
    path: path.resolve(__dirname, 'dist'), // path directory for all files is dist
    filename: 'assets/js/[name].js', // filename for js files - with contenthash
    // assets go to images - explanation - https://webpack.js.org/guides/asset-modules/
  },
  devtool: 'source-map', // add source map for development purposes
  // set up dev server
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },

    open: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
        ],
      },
      {
        test: /\.js$/,
        exclude: ['/node_modules/', '/js/**.test.js'],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(svg|png|jpg|gif|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        // i've used a generator to ensure fonts go to fonts folder
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers
      // (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin({
        include: /\.js$/,
        exclude: /\.html$/,
      }),
    ],
  },
  plugins: [
    new TerserPlugin({}),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
      chunkFilename: "assets/css/[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "activities.html",
      template: "activities.html",
    }),
    new HtmlWebpackPlugin({
      filename: "events.html",
      template: "events.html",
    }),
  ],
};

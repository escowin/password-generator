const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
    // PWA configuraton settings
    entry: {
      app: "./src/js/script.js",
    },
    output: {
      // saves bundle file to `dist/`
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          // preprocesses css stylesheets
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // preprocesses fonts
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: "assets/txt/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin({
        // "static" generates `report.html`. "disable" stops report generation
        analyzerMode: "static",
      }),
      new WebpackPwaManifest({
        // `manifest.json` object key-values
        publicPath: "./",
        name: "password generator",
        short_name: "f(pw)",
        description: "generates customized random passwords",
        start_url: "../index.html",
        background_color: "#2e2121",
        theme_color: "#2e2121",
        fingerprints: false,
        inject: false,
        icons: [
          {
            src: path.resolve("src/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
            purpose: "any maskable"
          },
        ],
      }),
    ],
    mode: "development", // webpack runs during development
    devServer: { static: "./" }, // non-webpack content loads from root in development environment
  };
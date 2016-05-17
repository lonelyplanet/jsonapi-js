"use strict";

const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

// Setup webpack plugins

let plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("development"),
      ASSET_HOST: JSON.stringify(process.env.ASSET_HOST),
      OPEN_PLANET_HOST: JSON.stringify(process.env.OPEN_PLANET_HOST),
    },
  }),
];

// Dynamically build entry files
const basePath = path.join(__dirname);
const vendorPath = path.join(__dirname, "node_modules");

module.exports = {
  debug: true,
  progress: true,
  context: basePath,
  entry: "src/open-planet/index",
  output: {
    path: "dist",
    filename: "openplanet.js",
    libraryTarget: "umd",
    library: "OpenPlanet"
  },
  module: {
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/,
    // }],
    loaders: [{
        test: /(\.js)$/,
        loader: "babel?presets[]=es2015," +
          `presets[]=${require.resolve("babel-preset-stage-1")}&` +
          "plugins[]=transform-decorators-legacy",
        // Excluding everything EXCEPT rizzo-next and flamsteed
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        loader: "json",
      }
    ],
  },
  resolve: {
    extensions: ["", ".js"],
    root: [basePath, vendorPath],
    fallback: path.join(__dirname, "node_modules"),
  },
  // Fallback to the node_modules directory if a loader can"t be found
  // Basically for when you `npm link rizzo-next`
  resolveLoader: {
    fallback: path.join(__dirname, "node_modules"),
  },
  plugins: plugins,
};

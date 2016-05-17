var webpack = require("webpack");
var config = require("./webpack.config");
var path = require("path");

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production"),
      "ASSET_HOST": JSON.stringify(process.env.ASSET_HOST),
      "OPEN_PLANET_HOST": JSON.stringify(process.env.OPEN_PLANET_HOST),
    },
  }),
];

config.loaders = [{
  test: /\.js$/,
  loader: "babel?presets[]=es2015&plugins[]=transform-decorators-legacy",
  // Excluding everything EXCEPT rizzo-next and flamsteed
  exclude: /node_modules\/(?!rizzo\-next|flamsteed).*/,
}, {
  test: /\.json$/,
  loader: "json",
}];

config.debug = false;
config.progress = false;
config.output.filename = "openplanet.min.js";
config.devtool = null;

module.exports = config;

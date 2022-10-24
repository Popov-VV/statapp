const path = require("path");

module.exports = {
  mode: "production",
  watch: true,
  devtool: "inline-source-map",
  entry: {
    main: "./src/scripts/tracker.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist/client"),
    filename: "tracker.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
};

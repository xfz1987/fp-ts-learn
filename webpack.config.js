const { resolve } = require('path');

module.exports = {
  entry: {
    main: resolve('src/index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader"
        }
      }
    ],
  }
};

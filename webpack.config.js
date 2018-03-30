const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};

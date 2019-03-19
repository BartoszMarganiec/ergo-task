const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/App/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: './src/App/index.js',
  output: {
    filename: 'js/app.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js(x)*$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};

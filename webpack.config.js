module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    publicPath: 'javascripts',
    path: "javascripts"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}

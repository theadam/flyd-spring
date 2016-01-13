'use strict';

var webpack = require('webpack');

var flydExternal = {
  root: 'flyd',
  commonjs2: 'flyd',
  commonjs: 'flyd',
  amd: 'flyd'
};

var rafLoopExternal = {
  root: 'rafLoop',
  commonjs2: 'raf-loop',
  commonjs: 'raf-loop',
  amd: 'raf-loop'
};

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = {
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
    ]
  },
  output: {
    library: 'flydSpring',
    libraryTarget: 'umd'
  },
  externals: {
    "raf-loop": rafLoopExternal,
    flyd: flydExternal
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js']
  }
};

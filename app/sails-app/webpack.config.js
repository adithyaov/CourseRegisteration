var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'react/build');
var APP_DIR = path.resolve(__dirname, 'react/src');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
      	enforce: "pre",
      	test: /\.jsx?$/,
      	loader: 'eslint-loader',
      	include : APP_DIR,
	      options: {
					failOnWarning: false,
			    failOnError: true
	      }
      },
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;
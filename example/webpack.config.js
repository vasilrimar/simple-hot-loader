var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: ['./app'],
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'output'),
		filename: 'bundle.js'
	},
	resolveLoader: {
		modulesDirectories: ['..', 'node_modules']
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{ test: /example\\.*\.js$/, loaders: ['simple-hot'] }
		]
	}
};

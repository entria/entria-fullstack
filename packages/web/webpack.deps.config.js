const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		ReactStuff: [
			'react',
			'react-dom',
			'react-relay'
		],
		Styles: [
			"rebass",
			"styled-system",
			"styled-components"
		]
	},
	output: {
		path: path.join(__dirname, 'dist-dll'),
		filename: '[name].dll.js',
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist-dll", "[name].json"),
			name: "[name]"
		})
	]
}
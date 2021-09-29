const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BannerPlugin } = require('webpack');

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		clean: true,
		library: { name: 'GodTierSerializer', type: 'umd' },
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			},
		],
	},
	plugins: [
		new BannerPlugin({
			banner:
				'god-tier-serializer 0.1.0 | MIT License | https://github.com/jlachniet/god-tier-serializer',
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
		],
	},
	mode: 'production',
	target: ['web', 'es5'],
};

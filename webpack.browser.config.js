const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BannerPlugin } = require('webpack');

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'god-tier-serializer.browser.js',
		library: { name: 'GodTierSerializer', type: 'window' },
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
			banner: `god-tier-serializer ${process.env.npm_package_version} | MIT License | https://github.com/jlachniet/god-tier-serializer`,
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
	resolve: { extensions: ['.ts'] },
	target: ['web', 'es5'],
};

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { BannerPlugin } = require('webpack');

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'god-tier-serializer.js',
		library: { type: 'commonjs2' },
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
		new CopyPlugin({
			patterns: [
				{
					from: 'src/index.d.ts',
					to: 'god-tier-serializer.d.ts',
				},
			],
		}),
	],
	optimization: {
		minimize: false,
	},
	mode: 'production',
	resolve: { extensions: ['.ts'] },
	target: ['node', 'es5'],
};

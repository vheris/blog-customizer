import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-styling-webpack',
		{
			name: '@storybook/addon-styling-webpack',

			options: {
				rules: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: {
									// Want to add more CSS Modules options? Read more here: https://github.com/webpack-contrib/css-loader#modules
									modules: {
										auto: true,
									},
								},
							},
						],
					},
					{
						test: /\.s[ac]ss$/,
						sideEffects: true,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: {
									// Want to add more CSS Modules options? Read more here: https://github.com/webpack-contrib/css-loader#modules
									modules: {
										auto: true,
									},
									importLoaders: 2,
								},
							},
							'resolve-url-loader',
							{
								loader: 'sass-loader',
								options: {
									// Want to add more Sass options? Read more here: https://webpack.js.org/loaders/sass-loader/#options
									sourceMap: true,
									sassOptions: {},
								},
							},
						],
					},
				],
			},
		},
		'@storybook/addon-webpack5-compiler-swc',
	],
	webpackFinal: async (config) => {
		if (config?.resolve?.alias) {
			config.resolve.alias = {
				fonts: path.resolve(__dirname, '..', './src/fonts'),
				src: path.resolve(__dirname, '..', './src'),
				components: path.resolve(__dirname, '..', './src/components'),
			};
		}

		return config;
	},
	framework: '@storybook/react-webpack5',
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	docs: {
		autodocs: 'tag',
	},
};
export default config;

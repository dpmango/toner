let webpack 		   = require('webpack');
let	path 			   = require('path');
let	ExtractTextPlugin  = require('extract-text-webpack-plugin');
let	argv 			   = require('yargs').argv;
let	CleanWebpackPlugin = require('clean-webpack-plugin');
let	BrowserSyncPlugin  = require('browser-sync-webpack-plugin');

const NODE_ENV	  = argv.NODE_ENV || 'development';
const DEV 		  = NODE_ENV === 'development';
const PROD 		  = NODE_ENV === 'production';
const BROWSERSYNC = NODE_ENV === 'browser-sync';

const BUNDLE_FOLDER_PATH = path.join(__dirname, 'public_html/local/templates/.default/bundle');

let config = {
	bundleFolderPath : BUNDLE_FOLDER_PATH,
	context: __dirname,
	entry: './html/src/entry.js',
	output: {
		path: path.join(BUNDLE_FOLDER_PATH, PROD ? 'prod' : 'dev'),
		pathinfo : !PROD,
		filename: 'bundle.js',
		chunkFilename: '[chunkhash].bundle.js',
	},
	resolve: {
		root: [path.join(__dirname, 'bower_components')]
	},
	postcss: [
		require('autoprefixer')({ browsers: ['last 10 versions'] })
	],
	watch : !!BROWSERSYNC,
	devtool : DEV || BROWSERSYNC ? 'source-map' : '',
	module: {
		noParse: [/moment.js/],
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap!postcss-loader')
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap!postcss-loader!less-loader?sourceMap')
			},
			{
				test: /\.s(c|a)ss$/,
				loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap!postcss-loader!sass?sourceMap')
			},
      {
				test: /\.(pug|jade)$/,
				loader: 'pug-loader'
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'url?limit=10000&name=[path][name].[ext]' + (PROD ? '!image-webpack?{progressive:true, optimizationLevel: 7}' : '')
			},
			{
				test: /\.svg$/,
				loader: 'advanced-url?limit=10000&name=[path][name].[ext]' + (PROD ? '!image-webpack' : '')
			},
			{
				test: /(\.(ttf|eot|otf|woff(2)?)|([\/\\]fonts[\/\\].+\.svg))($|\?)/i,
				loaders: [
					'url?limit=10000&name=[path][name].[ext]'
				]
			},
			{
				test: /\.html$/i,
				loader: 'html?minimize=true&removeRedundantAttributes=false'
			},
			{
				test: /\.jsx$/,
				loader: 'babel',
				query: {
					presets: ['latest', 'stage-3', 'react']
				}
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['latest', 'stage-3']
				}
			}
		]
	},
	advancedUrl: {
		handlers: {
			'image/svg+xml': function (content) {
				return 'data:image/svg+xml,' + encodeURIComponent(content).replace(/(\(|\))/g, '\\$&');
			}
		}
	},
	plugins: [
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
		),
		new ExtractTextPlugin('bundle.css', {
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV : JSON.stringify(NODE_ENV)
			}
		})
	]
};

if(BROWSERSYNC) {
	config.plugins.push(
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: { baseDir: ['./'] }
		})
	)
}

if(PROD) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		})
	);
}

if(DEV) {
	config.plugins.push(
		new CleanWebpackPlugin(['public_html/local/templates/.default/bundle/dev'], {
			root: path.resolve(__dirname),
			verbose: true,
			dry: false
		})
	);
}

if(PROD) {
	config.plugins.push(
		new CleanWebpackPlugin(['public_html/local/templates/.default/bundle/prod'], {
			root: path.resolve(__dirname),
			verbose: true,
			dry: false
		})
	);
}

module.exports = config;

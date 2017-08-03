const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment.
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // remove it in production environment.
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
  new Visualizer(), // remove it in production environment.
  new BundleAnalyzerPlugin({
    defaultSizes: 'parsed',
    // generateStatsFile: true,
    statsOptions: { source: false }
  }), // remove it in production environment.
];

module.exports = {
  devtool: 'source-map', // or 'inline-source-map'
  devServer: {
    disableHostCheck: true,
    contentBase: './dist'
  },

  entry: { "index": path.resolve(__dirname, 'src/index') },

  output: {
    filename: '[name].js',
    chunkFilename:  '[id].chunk.js',
    path: path.join(__dirname, '/dist'),
    publicPath: './'
  },

  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.js', '.jsx', '.js', '.json'],
  },

  module: {
    noParse: [/moment.js/],
    loaders: [
      {
        test: /\.(jsx|js)$/, exclude: /node_modules/, loader: 'babel',
        query: {
          plugins: [
            'external-helpers', // why not work?
            ["transform-runtime", { polyfill: false }],
            ["import", [{ "style": "css", "libraryName": "antd-mobile" }]]
          ],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      { test: /\.(jpg|png|gif)$/, loader: "url?limit=8192" },
      // svg-sprite for antd-mobile@1.0
      { test: /\.(svg)$/i, loader: 'svg-sprite', include: [
        require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
        // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 自己私人的 svg 存放目录
      ]},
      // { test: /\.css$/, loader: 'style!css' }, // 把css处理成内联style，动态插入到页面
      { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      { test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'shared',
      filename: 'shared.js'
    }),
    new HtmlWebpackPlugin({
        filename: __dirname + '/dist/index.html',//输出文件位置
        template: __dirname + '/public/index.ejs', // html模板路径,模板路径是支持传参调用loader的,
        inject: true, //允许插件修改哪些内容，true/'head'/'body'/false,
        //hash: true
    }),
    // new CopyWebpackPlugin([{
    //     from: __dirname + '/public/lib',
    //     to: __dirname + '/dist/src/lib'
    // }]),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    ...otherPlugins
  ]
}
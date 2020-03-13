const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

let defaults = require('./defaults');

// HappyPack生成器
const cHappyPack = (id, loaders) =>
  new HappyPack({
    id: id, // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
    debug: false, // 启用debug 用于故障排查。默认 false
    verbose: false, //是否允许 HappyPack 输出日志
    threads: 4, // 代表开启几个子进程去处理这一类型的文件，默认是3个，类型必须是整数
    loaders: loaders, // 用法和 webpack Loader 配置中一样
  });

// loaders
const prdLoaders = () => {
  if (process.env.DEFINED_ENV == 'dev') {
    return [];
  }
  return [
    {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader, // 提取经过处理的css至单独文件中，代替style-loader，只能用于webpack 4及以上版本，无法实现热更新，推荐在生产环境使用
        },
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1, // 在一个css中引入了另一个css，也会执行之前1个loader，即postcss-loader；若值设为2，执行postcss-loader和less-loader
            sourceMap: false,
            modules: {
              localIdentName: '[name]_[local]_[hash:base64:5]',
            },
          },
        },
        'postcss-loader',
        'less-loader',
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              '@hd': '2px',
            },
            javascriptEnabled: true,
          },
        },
      ],
      include: /node_modules/,
      exclude: /src/,
    },
  ];
};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: [path.resolve(process.cwd(), 'src/index.jsx')],
  },
  output: {
    pathinfo: process.env.DEFINED_ENV == 'prd' ? false : true,
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
  },
  cache: true,
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.less'],
    alias: {
      '~': path.resolve(defaults.srcPath),
      commons: path.resolve(defaults.srcPath, 'commons'),
      components: path.resolve(defaults.srcPath, 'components'),
      api: path.resolve(defaults.srcPath, 'components/api'),
      entries: path.resolve(defaults.srcPath, 'entries'),
      utils: path.resolve(defaults.srcPath, 'utils'),
      assets: path.resolve(defaults.srcPath, 'assets'),
      images: path.resolve(defaults.srcPath, 'assets/images'),
      styles: path.resolve(defaults.srcPath, 'assets/styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [defaults.srcPath],
        use: ['happypack/loader?id=Js&cacheDirectory'],
      },
      {
        enforce: 'pre', // pre 优先处理 normal 正常处理（默认）inline 其次处理 post 最后处理
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [defaults.srcPath],
        use: ['happypack/loader?id=ESLint&catch'],
      },
      {
        test: /\.(ico|mp4|ogg|png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader', // 功能类似于 file-loader，但是在文件大小（单位byte）低于指定的限制时，可以返回一个DataURL
            options: {
              esModule: false,
              limit: 10240,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            limit: 10240,
          },
        },
      },
      ...prdLoaders(),
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new SimpleProgressWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __wd_define_env__: JSON.stringify(process.env.DEFINED_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src/index.html'),
      filename: 'index.html', // 输出至指定目录
      chunks: ['index', 'vendors'],
      chunksSortMode: 'dependency', // 引用顺序
      hash: true,
      inject: true, // true：默认值，script标签位于html文件的body底部；body：script标签位于html文件的body底部（同 true）；head：script 标签位于head标签内；false：不插入生成的js文件，只是单纯的生成一个 html 文件
      alwaysWriteToDisk: true, // 将内存文件写入磁盘
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    cHappyPack('ESLint', ['eslint-loader']),
    cHappyPack('Js', ['babel-loader']),
  ],
  optimization: {
    splitChunks: {
      name: 'vendors',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all', // //同时分割同步和异步代码
        },
      },
    },
  },
  stats: {
    assets: true,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    hash: false,
    modules: false,
  },
};

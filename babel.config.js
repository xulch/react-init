const babelConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 0.1%'],
        },
        useBuiltIns: 'usage', // polyfill垫片按需加载
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-modules-commonjs', // 为解析api目录中commonjs模块化规范设置
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'import',
      {
        libraryName: 'antd-mobile',
        style: true,
      },
    ],
    [
      'react-css-modules',
      {
        filetypes: {
          '.less': {
            syntax: 'postcss-less',
          },
        },
        generateScopedName: '[name]_[local]_[hash:base64:5]',
        webpackHotModuleReloading: false,
        handleMissingStyleName: 'warn',
      },
    ],
  ],
};

module.exports = babelConfig;

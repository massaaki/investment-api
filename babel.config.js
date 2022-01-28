module.exports = {
  presets: [
    [
      // 'module:metro-react-native-babel-preset',
      // '@babel/preset-flow',
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
    [require('@babel/plugin-proposal-class-properties'), { loose: false }],
    // ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ['module-resolver', {
      alias: {
        '@': './src',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts',
    '**/*.test.ts'
  ]
}
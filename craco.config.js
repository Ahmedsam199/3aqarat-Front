const path = require('path')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    },
    postcss: {
      plugins: [require('postcss-rtl')()]
    }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@Component': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@alerts': path.resolve(__dirname, 'src/utility/alert'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@utility': path.resolve(__dirname, 'src/utility'),
      '@Types': path.resolve(__dirname, 'src/redux/Types.json'),
      '@Routes': path.resolve(__dirname, 'src/Routes.json'),
      '@validation': path.resolve(__dirname, 'src/validation'),
      '@columns': path.resolve(__dirname, 'src/columns'),
      '@FixedOptions': path.resolve(__dirname, 'src/FixedOptions'),
      '@toast': path.resolve(__dirname, 'src/utility/toast.js')
    }
  }
}

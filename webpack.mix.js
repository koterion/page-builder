const mix = require('laravel-mix')
const autoprefixer = require('autoprefixer')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

mix.js('src/js/editor.js', 'dist/js')
  .sass('src/sass/editor.sass', 'dist/css')

  .webpackConfig({
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['dist'] }
      })
    ]
  })

  .options({
    processCssUrls: false,
    postCss: [
      autoprefixer
    ]
  })

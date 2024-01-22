let mix = require('laravel-mix');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
mix.options({
  processCssUrls: false,
  postCss: [
    require('autoprefixer')
  ],
  // set uglify to false in order to prevent production minification
  // it prevents mix from pushing UglifyJSPlugin into the webpack config
  uglify: false
});
mix.webpackConfig({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/images', to: 'dist/images/' },
        { from: 'assets/vendors', to: 'dist/vendors/' },
        { from: 'assets/svg', to: 'dist/svg/' },
        { from: 'assets/fonts', to: 'dist/fonts/' }
      ]
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              "svgo",
              {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        // customize default plugin options
                        inlineStyles: {
                          onlyMatchedOnce: false,
                        },
                        // or disable plugins
                        removeDoctype: true,
                        removeViewBox: true,
                      },
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
  ],
  watchOptions: {
    ignored: /node_modules/
  },
  stats: {
    children: true,
  }
});

mix
  .browserSync({
    proxy: process.env.APP_URL,
    files: ["**/*.html", "**/*.php", "**/*.css", "**/*.js"],
    watchEvents: ["change"],
    injectChanges: true
  })
  .js('assets/js/admin/admin.js', 'admin/js/admin.js')
  .js('assets/js/public/public.js', 'public/js/app.js')
  .sass('assets/scss/admin/admin.scss', 'admin/css/admin.css')
  .sass('assets/scss/public/public.scss', 'public/css/styles.css')
  .disableNotifications()
  .sourceMaps()


// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.override(function (webpackConfig) {}) <-- Will be triggered once the webpack config object has been fully generated by Mix.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
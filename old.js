var gulp = require('gulp');
var mini = require('gulp-imagemin');
var plugins = require('gulp-load-plugins')({
  pattern: 'imagemin-*', // the glob to search for
  //config: 'package.json', // where to find the plugins, by default  searched up from process.cwd()
  //scope: ['dependencies', 'devDependencies'], // which keys in the config to look within
  replaceString: 'imagemin-', // what to remove from the name of the module when adding it to the context
  camelize: true, // if true, transforms hyphenated plugins names to camel case
  lazy: true, // whether the plugins should be lazy loaded on demand
});

var input = './input';
var output = './output';

gulp.task('default', function () {
  return gulp.src(input + '/*')
    // 配置详情见 https://www.npmjs.org/package/gulp-imagemin
    .pipe(mini({
      progressive: true,  // 针对 jpg，是否无损，默认假
      //optimizationLevel: 3,  // 针对 png，0-7，迭代压缩尝试等级，越高次数越多，默认 3
      interlaced: true,  // 针对 gif，是否交错呈现，默认假
      // 针对 svg，压缩所使用的插件列表，默认为 []
      // 所有的插件详情见 https://github.com/svg/svgo/tree/master/plugins
      // 通过看每个 exports.active 的真值确定默认是否启动
      svgoPlugins: [
        { removeViewBox: false },
        { removeComments: true }
      ],
      // imagemin 插件，默认为 null
      // 所有插件见 https://www.npmjs.org/browse/keyword/imageminplugin
      use: [
        plugins.optipng(),
        plugins.pngquant(),
        plugins.advpng(),
        plugins.pngcrush(),
        plugins.pngout(),
        plugins.jpegtran(),
        plugins.jpegRecompress(),
        plugins.mozjpeg(),
        plugins.gifsicle(),
        plugins.svgo(),
        plugins.zopfli()
      ]
    }))
    .pipe(gulp.dest(output));
});
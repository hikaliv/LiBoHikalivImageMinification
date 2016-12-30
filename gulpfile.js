// 配置详情见 https://www.npmjs.org/package/gulp-imagemin

const gulp = require('gulp')
const imagemin = require('gulp-imagemin')

const input = './input'
const output = './output'

gulp.task('default', () => gulp.src(input + '/*').pipe(imagemin([
  imagemin.gifsicle(),
  imagemin.jpegtran({
    progressive: true
  }),
  imagemin.optipng({
    optimizationLevel: 3
  }),
  imagemin.svgo()
])).pipe(gulp.dest(output)))
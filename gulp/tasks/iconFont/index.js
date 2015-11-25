var config      = require('../../config');
if(!config.tasks.iconFont) return;

var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../util/handleErrors');
var package          = require('../../../package.json');
var path             = require('path');

var fontPath = path.join(config.app.dest, config.tasks.iconFont.dest);
var cssPath = path.join(config.app.dest, config.tasks.css.dest);

var settings = {
  name: package.name + ' icons',
  src: path.join(config.app.src, config.tasks.iconFont.src, '/*.svg'),
  dest: path.join(config.app.dest, config.tasks.iconFont.dest),
  sassDest: path.join(config.app.src, config.tasks.css.src, config.tasks.iconFont.sassDest),
  template: path.normalize('./gulp/tasks/iconFont/template.scss'),
  sassOutputName: '_icons.scss',
  fontPath: path.relative(cssPath, fontPath),
  className: 'icon',
  options: {
    svg: true,
    timestamp: 0, // see https://github.com/fontello/svg2ttf/issues/33
    fontName: 'flex-icons',
    appendUnicode: true,
    normalize: false,
    formats: config.tasks.iconFont.extensions
  }
};

var iconFontTask = function() {
  return gulp.src(settings.src)
    .pipe(iconfont(settings.options))
    .on('glyphs', generateIconSass(settings))
    .on('error', handleErrors)
    .pipe(gulp.dest(settings.dest));
};

gulp.task('iconFont', iconFontTask);
module.exports = iconFontTask;

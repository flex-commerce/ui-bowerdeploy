var gulp   = require('gulp');
var del    = require('del');
var config = require('../config');
var path   = require('path');
var gutil  = require("gulp-util");

var cleanTask = function (cb) {

  var files= [];
  var glob = '**/*';

  files.push(path.join(config.app.dest, glob));
  // Don't touch node_modules or source files!
  files.push('!node_modules/**/*');
  files.push('!' + path.join(config.app.src, '/**/*'));

  del(files).then(function (paths) {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;

// // old task targetted clean method
// var files = [ path.join(config.app.dest, 'rev-manifest.json') ]
// for(var key in config.tasks) {
//   var task = config.tasks[key]
//   if(task.dest) {
//     var glob = '**/*' + (task.extensions ? ('.{' + task.extensions.join(',') + ',map}') : '')
//     files.push(path.join(config.app.dest, task.dest, glob))
//   }
// }
var gulp = require('gulp'),
  apidoc = require('gulp-apidoc'),
  mocha = require('gulp-mocha');

var root = "";

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('apidoc', function(done) {
  apidoc({
    src: "./services/",
    dest: "doc/",
    includeFilters: ["apiconst.js", "router.js"]
  }, done);
});

// gulp.task('apidoc',function(done){
//   apidoc({
//       src: "example/",
//       dest: "build/",
//       template: "template/",
//       debug: true,
//       includeFilters: [ ".*\\.js$" ]
//   },done);
// });

gulp.task("test", function () {
  return gulp.src('./services/*/test/*.js', {
      read: false
    })
    .pipe(mocha({
      reporter: "spec"
    }).on("error", handleError))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('deploy', function () {
  return runSequence('apidoc', 'test');
});
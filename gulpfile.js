var gulp = require('gulp'),
  apidoc = require('gulp-apidoc'),
  mocha = require('gulp-mocha'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  annotate = require('gulp-ng-annotate'),
  flatten = require('gulp-flatten'),
  inject = require('gulp-inject'),
  plumber = require('gulp-plumber'),
  runSequence = require('run-sequence'),
  less = require('gulp-less'),
  fs = require('fs'),
  bower = require('gulp-bower'),
  es = require('event-stream'),
  minifyCss = require('gulp-minify-css'),
  path = require('path'),
  child_process = require('child_process');

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

gulp.task("test", function () {
  return gulp.src('./test', {
      read: false
    })
    .pipe(mocha({
      reporter: "spec"
    }).on("error", handleError))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('build_js', function (cb) {
  var env = (process.env['RUNNING_ENVIRONMENT']) ? process.env['RUNNING_ENVIRONMENT'] : 'dev';

  var build = gulp.src('./public/app/**/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(annotate());
  if (env == 'prod') {
    build.pipe(uglify({
      mangle: true
    }));
  }
  build.pipe(gulp.dest('./build' + root))
    .on('end', cb);

});

// copy partials
gulp.task('build_html', function () {
  gulp.src('**/*.html', {
      cwd: './public/app/'
    })
    .pipe(flatten({
      newPath: 'partials'
    }))
    .pipe(gulp.dest('./build' + root))
});


gulp.task('build_deps', function (cb) {
  var i = 0;
  gulp.src([
      './public/resources/vendor/angular/angular.min.js',
      './public/resources/vendor/angular-animate/angular-animate.min.js',
      './public/resources/vendor/angular-bootstrap/ui-bootstrap.min.js',
      './public/resources/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      './public/resources/vendor/angular-loading-bar/build/loading-bar.min.js',
      './public/resources/vendor/angular-scroll/angular-scroll.min.js',
      './public/resources/vendor/braintree-angular/dist/braintree-angular.js',
      './public/resources/vendor/ui-router/release/angular-ui-router.min.js',
      './public/resources/vendor/angular-colorbox/js/angular-colorbox.js',
      './public/resources/vendor/Chart.js/Chart.js',
      './public/resources/vendor/angular-chart.js/dist/angular-chart.min.js',
      './public/resources/vendor/moment/min/moment.min.js',
      './public/resources/vendor/ng-joyride/ng-joyride.js',
      './public/resources/vendor/angular-recursion/angular-recursion.min.js',
      './public/resources/components/**/*.js'
    ]).pipe(concat('dependencies.js'))
    .pipe(annotate())

    .pipe(gulp.dest('./build/resources/vendor'))
    .on('end', callback);

  gulp.src([
      './public/resources/vendor/bootstrap/dist/css/bootstrap.min.css',
      './public/resources/vendor/angular-loading-bar/build/loading-bar.min.css',
      './public/resources/vendor/font-awesome/css/font-awesome.css',
      './public/resources/vendor/angular-colorbox/themes/dark/colorbox-darktheme.css',
      './public/resources/vendor/angular-chart.js/dist/angular-chart.min.css',
      './public/resources/vendor/ng-joyride/ng-joyride.css',
      './public/resources/components/**/*.css'
    ]).pipe(concat('dependencies.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./build/resources/vendor'))
    .on('end', callback);


  gulp.src([
      './public/resources/components/**/*.png'
    ]).pipe(flatten())
    .pipe(gulp.dest('./build/resources/vendor/img'))
    .on('end', callback);

  function callback() {
    if (i++ == 2) {
      return cb()
    }
  }
});

gulp.task('build_assets', function () {
  //copy font files
  gulp.src([
      './public/resources/vendor/bootstrap/fonts/*',
      './public/resources/vendor/font-awesome/fonts/*'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./build/resources/fonts'));
  //copy video files
  gulp.src([
      './public/resources/videos/**/*'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('./build/resources/videos'));
  //copy image assets
  gulp.src('./public/resources/images/**/*')
    .pipe(flatten())
    .pipe(gulp.dest('./build' + root + '/resources/images'));
  //copy icons
  gulp.src('./public/resources/icons/**/*')
    .pipe(flatten())
    .pipe(gulp.dest('./build' + root + '/resources/icons'));
});


// compile less + minify css
gulp.task('build_less', function () {
  gulp.src('./public/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./build/resources/css'))
});


gulp.task('inject_deps', function () {
  var sourcesVendor = gulp.src([
    'resources/vendor/dependencies.js',
    'resources/vendor/dependencies.css'
  ], {
    read: false,
    cwd: "./build"
  });

  var sourceApp = gulp.src([
    './resources/css/style.css',
    './app.js'
  ], {
    read: false,
    cwd: "./build"
  });

  gulp.src('./public/index.html')
    .pipe(inject(es.merge(sourcesVendor, sourceApp)))
    .pipe(gulp.dest('./build' + root))
});

gulp.task('bower', function () {
  return bower({
    cwd: './public'
  })
});

gulp.task('watch', ['build_js', 'build_html', 'build_less', 'build_assets'], function () {
  gulp.watch('./public/app/**/*.js', ['build_js']);
  gulp.watch('./public/less/**/*.less', ['build_less']);
  gulp.watch('./public/app/**/*.html', ['build_html']);
});

gulp.task('build', function () {
  return runSequence('bower', ['build_js', 'build_html', 'build_less', 'build_assets'], 'build_deps', 'inject_deps');
});

gulp.task('deploy', function () {
  return runSequence('apidoc', 'test', 'build');
});
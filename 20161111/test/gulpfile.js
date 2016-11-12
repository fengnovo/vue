var path = require('path'),
  runSequence = require('run-sequence'),
  del = require('del'),
  gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  historyApiFallback = require('connect-history-api-fallback'),


  rev =  require('gulp-rev'),
  revCollector = require('gulp-rev-collector'),
  uglify = require('gulp-uglify'),//js压缩
  minifycss = require('gulp-minify-css'),//css压缩
  concat = require('gulp-concat');//文件合并

var SRC_DIR = './src/';
var DIST_DIR = './web/';

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: SRC_DIR,
            middleware: [historyApiFallback()]
        }
    });
});

gulp.task('watch', function() {
  gulp.watch(SRC_DIR + 'css/*.css').on('change', browserSync.reload);
  gulp.watch(SRC_DIR + 'index.html').on('change', browserSync.reload);
  gulp.watch(SRC_DIR + 'js/*.js').on('change', browserSync.reload);
});

gulp.task('clean', function(cb) {
  return del([DIST_DIR], { force: true }, cb);
});


gulp.task('css_build', function() {
  gulp.src([SRC_DIR + 'libs/bootstrap-3.3.0-dist/css/bootstrap.min.css',SRC_DIR + 'css/*.css'])
    .pipe(concat('index.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(DIST_DIR + 'css/'));
});

gulp.task('js_build', function() {
  return gulp.src([SRC_DIR + 'libs/*.js',SRC_DIR + 'libs/js/*.min.js',SRC_DIR + 'js/*.js'])
             .pipe(concat('index.js'))
             .pipe(uglify())
             .pipe(gulp.dest(DIST_DIR + 'js/'));
});

gulp.task('html_build', /*['js_lint'], */function() {
  return gulp.src([SRC_DIR + 'html/index.html'])
             .pipe(gulp.dest(DIST_DIR));
});

gulp.task('rev', function() {
  return gulp.src([DIST_DIR + 'js/*.js', DIST_DIR + 'css/*.css'], {base: DIST_DIR})
    .pipe(rev())
    .pipe(gulp.dest(DIST_DIR))
    .pipe(rev.manifest())
    .pipe(gulp.dest(DIST_DIR));
});

//先把版本号对应到html，再html_build
gulp.task('rev_collector', function() {
  del([DIST_DIR + 'js/index.js', DIST_DIR + 'css/index.css'], { force: true });
  return gulp.src([DIST_DIR + 'rev-manifest.json', SRC_DIR + 'html/index.html'], {base: DIST_DIR})
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest(DIST_DIR));
});


gulp.task('default',['clean','browser-sync', 'watch']);

gulp.task('build',function(){
    runSequence('clean','css_build', 'js_build','rev','rev_collector','html_build', function(){
      console.log('build over');
    });
  }
);


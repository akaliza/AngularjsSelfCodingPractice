var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var order = require("gulp-order");
var path = require('path');
var inject = require('gulp-inject');
var Server = require('karma').Server;


var config = require('./gulp.config.js')();
var jspackage = require('./package.json');


gulp.task('less', function () {
    return gulp.src('./assets/less/app.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./assets/css'));
});


gulp.task('watch', function () {
    gulp.watch('./assets/less/**/*.less', ['less']);  // Watch all the .less files, then run the less task
});

gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: 8080
    });
});

gulp.task('libs', function () {
    return gulp.src(config.libs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./assets'));
});

gulp.task('build-index', function () {

    return gulp
        .src(config.index)
        .pipe(inject(gulp.src(config.js, {read: false})
            .pipe(order(config.jsFileOrder)), {

            name: 'app',
            transform: function (filePath) {
                console.log(filePath);
                return '<script src=".' + filePath + '?' + jspackage.version + '"></script>';
            }
        }))
        .pipe(gulp.dest('.'));
});


gulp.task('test', function (done) {
    new Server({
        configFile:  __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('default', ['less', 'libs', 'build-index']);
gulp.task('w', ['less', 'libs', 'build-index', 'watch']);
gulp.task('run', ['less', 'libs', 'build-index', 'watch', 'connect']); // Default will run the 'entry' watch task

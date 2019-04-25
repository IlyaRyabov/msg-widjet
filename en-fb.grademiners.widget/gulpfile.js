var local_domain = 'http://localhost:8888/en-fb.grademiners.widget/';
var path_to_theme = '/wp-content/themes/maket_11_de/'; //url with trailing slash

//NPM-MODULES
//--------------------------------------------------
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require("gulp-rename");
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var critical = require('critical');
var babel = require('gulp-babel');

var util = require('gulp-util');
var is_prod = util.env.production;

//TASK: gulp
//--------------------------------------------------
gulp.task('default', ['less', 'js'], function () {
    is_prod ? gulp.start('img') : gulp.start('browser-sync', 'watch');
});

//TASK: gulp watch
//--------------------------------------------------
gulp.task('watch', function() {
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch(['./js/**/*.js', '!./js/scripts.min.js'], ['js']);
});

// TASK: compile es6 to es5
gulp.task('es6', function() {
    gulp.src("js/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("js"));
});

//TASK: gulp img
//--------------------------------------------------
gulp.task('img', function() {
    gulp.src(['./{img,css}/**/*.{png,jpg,jpeg,gif}', './screenshot.png'])
        .pipe(plumber())
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest("./"));
});

//TASK: gulp less
//--------------------------------------------------
gulp.task('less', function () {
    gulp.src(['./less/style.less', './less/plugins.less'])
        .pipe(plumber())
        .pipe(!is_prod ? sourcemaps.init() : util.noop())
        .pipe(less())
        .pipe(rename({extname: ".min.css"}))
        .pipe(autoprefixer({browsers: ['last 50 versions']}))
        .pipe(is_prod ? cleanCSS({compatibility: 'ie8', keepSpecialComments: 1}) : util.noop() )
        .pipe(!is_prod ? sourcemaps.write() : util.noop())
        .pipe(gulp.dest('./'))
});


//TASK: gulp front page less
//--------------------------------------------------
gulp.task('home-less', function () {
    gulp.src(['./less/home.less'])
        .pipe(plumber())
        .pipe(!is_prod ? sourcemaps.init() : util.noop())
        .pipe(less())
        .pipe(rename({extname: ".min.css"}))
        .pipe(autoprefixer({browsers: ['last 50 versions']}))
        .pipe(is_prod ? cleanCSS({compatibility: 'ie8', keepSpecialComments: 1}) : util.noop() )
        .pipe(!is_prod ? sourcemaps.write() : util.noop())
        .pipe(gulp.dest('./'))
});


//TASK: gulp js
//--------------------------------------------------
gulp.task('js', function() {
    return gulp.src(['./js/plugins/**/*.js', './js/main.js'])
        .pipe(plumber())
        .pipe(!is_prod ? sourcemaps.init() : util.noop())
        .pipe(concat('./scripts.min.js'))
        .pipe(uglify())
        .pipe(!is_prod ? sourcemaps.write() : util.noop())
        .pipe(gulp.dest("./js"));
});

//TASK: gulp browser-sync
//--------------------------------------------------
gulp.task('browser-sync', function() {
    //watch files
    var files = [
        './**/*.css',
        './js/**/*.js',
        './**/*.php'
    ];

    //initialize browsersync
    browserSync.init(files, {
        proxy: local_domain,
        injectChanges: true,
        notify: false
    });
});

//TASK: gulp critical-css
//before run this task you need comment next code in functions.php:
//add_action( 'wp_enqueue_scripts', 'ox_adding_critical_css' );
//--------------------------------------------------
gulp.task('critical', function() {
    critical.generate({
        src: local_domain,
        dest: 'css/critical.css.php',
        minify: true,
        pathPrefix: path_to_theme
    });
});

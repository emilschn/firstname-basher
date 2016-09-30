//load plugins
var project          = "firstname-basher",
    gulp             = require("gulp"),
    uglify           = require("gulp-uglify"),
    rename           = require("gulp-rename"),
    concat           = require("gulp-concat"),
    jshint           = require("gulp-jshint"),
    notify           = require("gulp-notify"),
    plumber          = require("gulp-plumber"),
    order            = require("gulp-order"),
    path             = require("path"),
    gutil            = require("gulp-util"),
    autoprefixer     = require('gulp-autoprefixer'),
    csso             = require('gulp-csso'),
    stripCssComments = require('gulp-strip-css-comments');

// the title and icon that will be used for the Grunt notifications
var notifyInfo = {
    title: "Gulp",
    icon: path.join(__dirname, "node_modules/gulp-notify/examples/gulp.png")
};

// error notification settings for plumber
var plumberErrorHandler = {errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};



// styles
gulp.task("styles", function () {
    return gulp.src('./assets/style.css')
            .pipe(plumber(plumberErrorHandler))

            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
                cascade: false
            }))
            .pipe(gulp.dest('./prod/css/'))
            .pipe(stripCssComments({preserve: false}))
            .pipe(csso())
            .pipe(gulp.dest('./prod/css/'));
});



// scripts
gulp.task("scripts", function () {
    return gulp.src('./assets/script.js')
            .pipe(plumber(plumberErrorHandler))
            .pipe(jshint())
            .pipe(jshint.reporter("default"))
            .pipe(rename({suffix: ".min"}))
            .pipe(uglify())
            .pipe(gulp.dest("./prod/js"));
});

// default
gulp.task("default", function () {

    //watch .scss files
    gulp.watch("./assets/style.css", ["styles"]);

    //watch .js files
    gulp.watch("./assets/script.js", ["scripts"]);

    //reload when a template file, the minified css, or the minified js file changes
    gulp.watch([
        "./prod/css/app.css",
        "./prod/js/app.js"
    ],
    function (event) {
        gulp.src(event.path)
                .pipe(plumber())
                .pipe(notify({
                    title: notifyInfo.title,
                    icon: notifyInfo.icon,
                    message: event.path.replace(__dirname, "").replace(/\\/g, "/") + " was " + event.type + " and reloaded"
                })
        );
    });
});
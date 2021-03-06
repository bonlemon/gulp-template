// require("babel-register");

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync');
const del = require('del');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const babel = require('gulp-babel');
const concatCss = require('gulp-concat-css');


// Task for update sass files and convert the files into css
gulp.task('sass', () =>
    gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concatCss('main.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('app'))
        // update browser, when sass files will be updated
        .pipe(browserSync.reload({
            stream: true
        }))
)


gulp.task('script', () =>
    gulp.src('app/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({
            stream: true
        }))
)


// Configuration and start of browserSync
// The browserSync will update browser when files were updated
gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})

// Start "watch" process
// First - start browserSync and sass task 
// Then start search changes of scss, html and js files
gulp.task('watch', ['browserSync', 'sass', 'script'], () => {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', ['script']);
    gulp.watch('app/*.html', browserSync.reload);
    // gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Remove production folder
gulp.task('clean', () => {
    del.sync('production')
})

// Production build
// Remove production folder
// And then transfer files into production folder
gulp.task('build', ['clean', 'sass'], () => {
    gulp.src('app/main.css')
        .pipe(gulp.dest('production'))

    // gulp.src('app/js/**/*.js')
    gulp.src('app/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('production'))

    gulp.src('app/*.html')
        .pipe(gulp.dest('production'));

    gulp.src('app/img/*')
        .pipe(gulp.dest('production/img'));
});

// Defaul task
gulp.task('default', ['watch']);
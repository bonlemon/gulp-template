const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 vertions']
            }))
            .pipe(cleanCss())
            .pipe(gulp.dest('./css'))
})
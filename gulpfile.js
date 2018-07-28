const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cleanCss())
            .pipe(gulp.dest('app/css'))
})


gulp.task('watch', function() {
    // gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	// gulp.watch('app/*.html', browserSync.reload);
	// gulp.watch('app/js/**/*.js', browserSync.reload);

});

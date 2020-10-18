var gulp = require('gulp');
var broserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imageMin = require('gulp-imagemin');

gulp.task('load',function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(broserSync.stream());
});

gulp.task('minifyImg',function(){
    return gulp.src('src/img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/img/'))
    .pipe(broserSync.stream());
});

gulp.task('simplifiesJS',function(){
    return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe('dist/js/')
    .pipe(broserSync.stream());
});

gulp.task('sass',function(){
    return gulp.src('src/sass/*.scss')
    .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/css'))
    .pipe(broserSync.stream())
});

gulp.task('watch',function(){
    broserSync.init({
        server:'dist/'
    });
    gulp.watch('src/*.html',gulp.series('load')).on('change',broserSync.reload);
    gulp.watch('src/img/*',gulp.series('minifyImg')).on('change',broserSync.reload);
    gulp.watch('src/js/*.js',gulp.series('simplifiesJS')).on('change',broserSync.reload);
    gulp.watch('src/sass/*.scss',gulp.series('sass')).on('change',broserSync.reload);
});

gulp.task('run',gulp.parallel('load','watch'))

gulp.task('default',gulp.series('run'));
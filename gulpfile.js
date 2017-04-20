var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'builds/development/',
    tsSrc = 'process/ts/';

gulp.task('html', function() {
    gulp.src(appSrc + '**/*.html');
});

gulp.task('css', function() {
    gulp.src(appSrc + '**/*.css');
});

gulp.task('cleanlib', function() {
    return del.sync(appSrc + "js/lib/**");
});

gulp.task('cleanapp', function() {
    return del.sync(appSrc + "js/app/**");
});

gulp.task('clean', ['cleanlib', 'cleanapp']);

gulp.task('copynglibs', function() {
    return gulp
        .src([
            'node_modules/@angular/animations/bundles/animations.umd.js',
            'node_modules/@angular/animations/bundles/animations-browser.umd.js',
            'node_modules/@angular/core/bundles/core.umd.js',
            'node_modules/@angular/common/bundles/common.umd.js',
            'node_modules/@angular/compiler/bundles/compiler.umd.js',
            'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
            'node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            'node_modules/@angular/http/bundles/http.umd.js',
            'node_modules/@angular/router/bundles/router.umd.js',
            'node_modules/@angular/router/bundles/router-upgrade.umd.js',
            'node_modules/@angular/forms/bundles/forms.umd.js',
            'node_modules/@angular/upgrade/bundles/upgrade.umd.js',
            'node_modules/@angular/upgrade/bundles/upgrade-static.umd.js',
            'node_modules/@angular/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        ])
        .pipe(gulp.dest(appSrc + 'js/lib/@angular'));
});

gulp.task('copyrxlibs', function() {
    return gulp
        .src(['node_modules/rxjs/*.js',
            '!node_modules/rxjs/Rx.js'
        ])
        .pipe(gulp.dest(appSrc + 'js/lib/rxjs')) && gulp
        .src(['node_modules/rxjs/observable/*.js'])
        .pipe(gulp.dest(appSrc + 'js/lib/rxjs/observable')) && gulp
        .src(['node_modules/rxjs/operator/*.js'])
        .pipe(gulp.dest(appSrc + 'js/lib/rxjs/operator')) && gulp
        .src(['node_modules/rxjs/scheduler/*.js'])
        .pipe(gulp.dest(appSrc + 'js/lib/rxjs/scheduler')) && gulp
        .src(['node_modules/rxjs/symbol/*.js'])
        .pipe(gulp.dest(appSrc + 'js/lib/rxjs/symbol')) && gulp
        .src(['node_modules/rxjs/util/*.js'])
        .pipe(gulp.dest(appSrc + 'js/lib/rxjs/util'));
});


gulp.task('copylibs', ['cleanlib', 'copynglibs', 'copyrxlibs'], function() {
    return gulp
        .src([
            'node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/systemjs/dist/system.src.js',
            'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        ])
        .pipe(gulp.dest(appSrc + 'js/lib'));
});

gulp.task('typescript', ['cleanapp'], function() {
    return gulp
        .src(tsSrc + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appSrc + 'js/'));
});

gulp.task('watch', function() {
    gulp.watch(tsSrc + '**/*.ts', ['typescript']);
    gulp.watch(appSrc + 'css/*.css', ['css']);
    gulp.watch(appSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
    gulp.src(appSrc)
        .pipe(webserver({
            livereload: true,
            open: false
        }));
});

gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);
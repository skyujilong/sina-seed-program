/**
 * Created by sina on 2016/5/19.
 */
'use strict';
let gulp = require('gulp');
let webpack = require('webpack');
let clean = require('gulp-clean');
let path = require('path');
let gutil = require('gulp-util');
gulp.task('default', ['bulid']);
gulp.task('clean', function () {
    gulp.src(path.join(__dirname, 'assets'))
        .pipe(clean());
});
gulp.task('clean-test', function () {
    gulp.src(path.join(__dirname, 'test'))
        .pipe(clean());
});
gulp.task('bulid', ['clean'], function (done) {
    let webpackConfig = require('./webpack.config.js')();
    webpack(webpackConfig, (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
        done();
    });
});

gulp.task('dev-bulid', ['clean-test'], (done)=> {
    let webpackConfig = require('./webpack.config.js')(true);
    webpackConfig.watch = true;
    webpack(webpackConfig, (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({colors: true}));
    })
});
const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const open = require('gulp-open');
const del = require('del');
const url = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = {
    example: require('./example/webpack.config.js')
};

const WPACK_DEV_HOST = 'localhost';
const WPACK_DEV_PORT = 8080;

const urlBuilder = (host, port, path) => url.format({
    protocol: 'http',
    hostname: host,
    port: port,
    pathname: path
});

gulp.task('open', () => {
    const path = 'webpack-dev-server/index.html';
    const uri = urlBuilder(WPACK_DEV_HOST, WPACK_DEV_PORT, path);
    gulp.src('').pipe(open({uri: uri}));
});

gulp.task('clean', cb => del(['lib']).then(cb));

gulp.task('babel', ['clean'], () => gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib')));

gulp.task('webpack-dev-server', () => {
    new WebpackDevServer(webpack(webpackConfig.example), {
        publicPath: '/assets/',
        contentBase: 'example',
        hot: true,
        stats: {colors: true}
    }).listen(WPACK_DEV_PORT, WPACK_DEV_HOST, err => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
    });
});

gulp.task('lint', () => gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format()));

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['lint']);
    gulp.watch('test/**/*.js', ['lint']);
});

gulp.task('build', ['clean', 'babel']);
gulp.task('default', ['webpack-dev-server', 'open']);

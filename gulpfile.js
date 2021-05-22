const { src, dest, series, watch } = require("gulp")
const sass = require("gulp-sass");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const prefix = require("gulp-autoprefixer");
const browsersync = require("browser-sync");

const sendHtml = () => {
    return src("src/**/*.html")
        .pipe(dest("dist/"));
}

const sendImg = () => {
    return src("src/assets/img/*.{jpg,png}")
        .pipe(dest("dist/assets/img/*{jpg,png}"));
}

const compileSass = () => {
    return src("src/sass/*.scss")
        .pipe(sass())
        .pipe(prefix("last 5 versions"))
        .pipe(minify())
        .pipe(dest("dist/css/"));
}

const jsmin = () => {
    return src("src/js/*.js")
        .pipe(terser())
        .pipe(dest("dist/js/"))
}

const browswesyncServe = cb => {
    browsersync.init({
        server: {
            baseDir: "./dist"
        }
    });

    cb();
}

const browsersyncReload = cb => {
    browsersync.reload();
    cb();
}

const watchTask = () => {
    watch('src/**/*.html', series(sendHtml, browsersyncReload));
    watch('src/sass/**/*.scss', series(compileSass, browsersyncReload));
    watch('src/js/*.js', series(jsmin, browsersyncReload));
    watch('src/assets/img/*.{jpg,png}', series(sendImg, browsersyncReload));
}

exports.default = series(
    sendHtml,
    sendImg,
    compileSass,
    jsmin,
    browswesyncServe,
    watchTask
);
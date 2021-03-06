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

const sendAssets = () => {
    return src("src/assets/**/*")
        .pipe(dest("dist/assets/"));
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
    watch('src/assets/**/*.{svg, png, svg}', series(sendAssets, browsersyncReload));
}

exports.default = series(
    sendHtml,
    sendAssets,
    compileSass,
    jsmin,
    browswesyncServe,
    watchTask
);
/// <binding BeforeBuild="tslint, typescript, less, lint, compressjs, compresscss" />
var gulp = require("gulp");
var less = require("gulp-less");
var path = require("path");
var plumber = require("gulp-plumber");
var jshint = require("gulp-jshint");
var tslint = require("gulp-tslint");
var ts = require("gulp-typescript");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var util = require("gulp-util");
var minifyCss = require("gulp-minify-css");
var flatten = require("flatten-packages");

gulp.task("flatten", function () {
    return gulp.src(".")
    .pipe(flatten());
});

gulp.task("less", function () {
    return gulp.src("./Content/**/*.less")
        .pipe(sourcemaps.init())
    .pipe(plumber())
      .pipe(less({
          paths: [path.join(__dirname, "less", "includes")]
      }))
        .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./content/"));
});

gulp.task("typescript", function () {
    var tsResult = gulp.src("./Scripts/**/*.ts")
        .pipe(sourcemaps.init())
    .pipe(ts({ noImplicitAny: true, sortOutput: true }));

    return tsResult.js
        .pipe(concat("outscript.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./scripts"));
});

gulp.task("lint", function () {
    return gulp.src(["./Scripts/**/*.js",
        "!./Scripts/**/*.min.js",
        "!./Scripts/**/jquery*.js",
        "!./Scripts/**/modernizr*.js",
        "!./Scripts/**/respond.js",
        "!./Scripts/**/d3.js",
        "!./Scripts/**/angular*.js",
        "!./Scripts/**/bootstrap*.js",
        "!./Scripts/**/_references.js",
    "!./Scripts/**/moment*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter("default", { verbose: true }));
});

gulp.task("tslint", function () {
    return gulp.src(["./Scripts/*.ts"])
    .pipe(tslint())
    .pipe(tslint.report("verbose"));
});

gulp.task("compressjs", function () {
    return gulp.src(["./Scripts/**/*.js",
        "!./Scripts/**/*.min.js",
        "!./Scripts/**/jquery*.js",
        "!./Scripts/**/modernizr*.js",
        "!./Scripts/**/respond.js",
        "!./Scripts/**/d3.js",
        "!./Scripts/**/angular*.js",
        "!./Scripts/**/bootstrap*.js",
        "!./Scripts/**/_references.js"])
    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", util.log))
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./Scripts"));
});

gulp.task("compresscss", function () {
    return gulp.src(["./Content/Site.css",
        "!./Content/**/*.min.css"
    ])
    .pipe(sourcemaps.init())
    .pipe(minifyCss().on("error", util.log))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./Content"));
});
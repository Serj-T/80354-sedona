"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var rename = require("gulp-rename");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var run = require("run-sequence");
var clean = require("del");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 2 version"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});
gulp.task("serve", function() {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

gulp.task("svgicons", function() {
  return gulp.src("build/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img/icons"))
    .pipe(svgstore({
      inlineSvg: true}))
    .pipe(rename("icons.svg"))
    .pipe(gulp.dest("build/img/icons"));
});

gulp.task("imagemin", function() {
  return gulp.src("img/**/*.jpg")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**/*",
    "js/**",
    "*.html"
  ], {
  base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return clean("build");
});

gulp.task("build", function(fn) {
  run("clean", "copy", "style", "imagemin", "svgicons", fn);
});

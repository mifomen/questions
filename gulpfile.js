const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task('files-watch', function (done) {
  browserSync.reload();
  done();
});

gulp.task("serv", function () {
  browserSync.init({
    server: {
      baseDir: "src"
    },
    notify: false,
    open: true,
    ui: false
  }),
    gulp.watch("src/**/*.*", gulp.parallel("files-watch"));
});

// exports.default = defaultTask

// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }

// exports.default = defaultTask

const gulp = require("gulp");
const browserSync = require("browser-sync").create();

// gulp.task("changes", function (){
//   // return gulp.src(["source/img/**/*.*"])
//   // .pipe(gulp.dest("build/img"))
//   .pipe(browserSync.reload({
//     stream: true
//   }))
// })


gulp.task('files-watch', function (done) {
  browserSync.reload();
  done();
});

gulp.task("serv", function (){
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

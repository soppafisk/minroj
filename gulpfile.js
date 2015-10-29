var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");

gulp.task("scripts", function(callback) {
    // run webpack
    console.log("scripts");
    webpack({
      context: __dirname + "/src/js",
      entry: "./scripts.js",
      output: {
          path: __dirname + "/dist",
          filename: "bundle.js"
      }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("watch", function() {
   gulp.watch("src/js/scripts.js", ['scripts']);
});

"use strict";

var watch = require("gulp-watch"),
	gulp = require("gulp"),
	path = require("path"),
	ftp = require("gulp-ftp"),
	config = require("../webpack.config"),
	ftpSettings = require("./ftp-settings.js");

require("./build");


watch(path.join(config.bundleFolderPath, "/**/*.*"), function (vinyl) {
	var remotePath = path.join(
		ftpSettings.remotePath,
		path.relative(
			config.bundleFolderPath,
			path.dirname(vinyl.path)
		)
	);

	return gulp.src(vinyl.path).pipe(ftp({
		host: ftpSettings.host,
		port: ftpSettings.port,
		user: ftpSettings.user,
		pass: ftpSettings.pass,
		remotePath : remotePath
	}));
});
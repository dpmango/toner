"use strict";

var webpack = require("webpack"),
	path = require("path"),
	gutil = require("gulp-util"),
	config = require("../webpack.config");

webpack(config, function(err, stats) {
	if(err) throw new gutil.PluginError("webpack", err);
	gutil.log("[webpack]", stats.toString({
		colors : true,
		chunks : false
	}));
	console.log(stats.toJson().time);
});
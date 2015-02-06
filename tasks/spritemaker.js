'use strict';

var _ = require('lodash'),
	path = require('path'),
	util = require('util'),
	Canvas = require('canvas');

module.exports = function (grunt) {
	grunt.registerMultiTask('spritemaker', 'custom sprite creator', function () {
		var options = this.options({
			outputDir: 'assets/images',
			context: {},
			postfix: '',
			width: 0,
			height: 0
		});

		_.each(this.data, function (sprite, spritePath) {
			var w = +sprite.width,
				h = +sprite.height;

			if (isNaN(w) || !w) {
				w = options.width;
			}

			if (isNaN(h) || !h) {
				h = options.height;
			}

			if (!w || !h) {
				grunt.fail.fatal(util.format('The width/height property not specified for "%s" sprite', spritePath));
			}

			if (_.isString(sprite.processor)) {
				try {
					sprite.processor = require(path.resolve(sprite.processor));
				} catch (e) {
				}
			}

			if (_.isFunction(sprite.processor)) {
				var canvas = new Canvas(w, h),
					ctx = canvas.getContext('2d');

				ctx.clearRect(0, 0, w, h);
				sprite.processor.call(_.merge({}, options.context, sprite.context || {}), ctx, w, h);

				if (path.extname(spritePath).length < 2) {
					if (!_.isEmpty(options.postfix)) {
						spritePath += options.postfix[0] === '.'? options.postfix: '.' + options.postfix;
					}
					spritePath += '.png';
				}

				grunt.file.write(path.join(options.outputDir, spritePath), canvas.toBuffer());
			}
			else {
				grunt.fail.fatal(util.format('The processor not found for "%s" sprite', spritePath));
			}
		}, this);
	});
};
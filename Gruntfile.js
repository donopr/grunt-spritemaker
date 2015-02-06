/*
 * grunt-spritegen
 * 
 *
 * Copyright (c) 2015 Dmitry Onoprienko
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	// load all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},

		clean: {
			tests: ['tmp']
		},

		spritemaker: {
			options: {
				outputDir: 'tmp',
				width: 16,
				height: 16,
				postfix: 'gen'
			},

			sprites: {
				redRect16x16: {
					processor: function (ctx, clientWidth, clientHeight) {
						ctx.fillStyle = 'red';
						ctx.fillRect(0, 0, clientWidth, clientHeight);
					}
				},
				blueRect24x16: {
					width: 24,
					processor: function (ctx, clientWidth, clientHeight) {
						ctx.fillStyle = 'blue';
						ctx.fillRect(0, 0, clientWidth, clientHeight);
					}
				},
				redCircle16: {
					processor: 'test/redCircle16'
				}
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.registerTask('test', ['clean', 'spritemaker']);
	grunt.registerTask('default', ['jshint', 'test']);
};

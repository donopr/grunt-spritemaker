'use strict';

module.exports = function(ctx, clientWidth) {
	var r = clientWidth / 2;

	ctx.beginPath();
	ctx.arc(r, r, r, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'red';
	ctx.fill();
};
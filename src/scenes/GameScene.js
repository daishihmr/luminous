var tm = require("../../libs/tmlib");

var GameScene = tm.createClass({
	superClass: tm.app.Scene,
	init: function() {
		this.superInit();
		this.fromJSON({
			children: {
				title: {
					type: "tm.display.Label",
					init: ["hello world"],
					x: 250,
					y: 250,
				}
			}
		});
	}
});

module.exports = GameScene;

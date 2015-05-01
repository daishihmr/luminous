var tm = require("../libs/tmlib");
var GameScene = require("./scenes/GameScene");

tm.main(function() {
	var app = tm.display.CanvasApp("#app");
	app.resize(500, 500).fitWindow();

	app.replaceScene(GameScene("123"));

	app.run();
});

module.exports = function(grunt) {
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-rename");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-wget");
	grunt.loadNpmTasks("grunt-zip");
	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-exorcise");

	grunt.initConfig({
		clean: {
			cache: ["cache"],
			electron: ["electron"],
			build: ["build"]
		},
		wget: {
			electron: {
				files: {
					"cache/electron-v0.25.1-win32-x64.zip": "https://github.com/atom/electron/releases/download/v0.25.1/electron-v0.25.1-win32-x64.zip",
					"cache/electron-v0.25.1-darwin-x64.zip": "https://github.com/atom/electron/releases/download/v0.25.1/electron-v0.25.1-darwin-x64.zip",
					"cache/electron-v0.25.1-linux-x64.zip": "https://github.com/atom/electron/releases/download/v0.25.1/electron-v0.25.1-linux-x64.zip",
				}				
			}
		},
		unzip: {
			"electron-win": {
				src: "cache/electron-v0.25.1-win32-x64.zip",
				dest: "electron/win",
			},
			"electron-darwin": {
				src: "cache/electron-v0.25.1-darwin-x64.zip",
				dest: "electron/darwin",
			},
			"electron-linux": {
				src: "cache/electron-v0.25.1-linux-x64.zip",
				dest: "electron/linux",
			}
		},
		rename: {
			electron: {
				files: [
					{ src: "electron/win/electron.exe", dest: "electron/win/luminous.exe" },
					{ src: "electron/darwin/Electron.app", dest: "electron/darwin/Luminous.app" },
					{ src: "electron/linux/electron", dest: "electron/linux/luminous" },
				]
			}
		},
		copy: {
			tmlib: {
				src: "tmlib.js/build/tmlib.js",
				dest: "libs/tmlib.js"
			},
			"electron-win": {
				files: [
					{ src: ["package.json"], dest: "electron/win/resources/app/package.json" },
					{ src: ["app.js"], dest: "electron/win/resources/app/app.js" },
					{ src: ["index.html"], dest: "electron/win/resources/app/index.html" },
					{ src: ["build/luminous.js"], dest: "electron/win/resources/app/build/luminous.js" },
					{ expand: true, src: ["asset/*"], dest: "electron/win/resources/app/" },
				]
			},
			"electron-darwin": {
				files: [
					{ src: ["package.json"], dest: "electron/darwin/Luminous.app/Contents/Resources/app/package.json" },
					{ src: ["app.js"], dest: "electron/darwin/Luminous.app/Contents/Resources/app/app.js" },
					{ src: ["index.html"], dest: "electron/darwin/Luminous.app/Contents/Resources/app/index.html" },
					{ src: ["build/luminous.js"], dest: "electron/darwin/Luminous.app/Contents/Resources/app/build/luminous.js" },
					{ expand: true, src: ["asset/*"], dest: "electron/darwin/Luminous.app/Contents/Resources/app/" },
				]
			},
			"electron-linux": {
				files: [
					{ src: ["package.json"], dest: "electron/linux/resources/app/package.json" },
					{ src: ["app.js"], dest: "electron/linux/resources/app/app.js" },
					{ src: ["index.html"], dest: "electron/linux/resources/app/index.html" },
					{ src: ["build/luminous.js"], dest: "electron/linux/resources/app/build/luminous.js" },
					{ expand: true, src: ["asset/*"], dest: "electron/linux/resources/app/" },
				]
			},
		},
		browserify: {
			build: {
				files: {
					"build/luminous.js": ["src/main.js"]
				}
			},
		},
		exorcise: {
			build: {
				files: {
					"build/luminous.map": ["build/luminous.js"]
				}
			}
		}
	});
	
	grunt.registerTask("init-electron", ["clean:cache", "clean:electron", "wget:electron", "unzip:electron-win", "unzip:electron-darwin", "unzip:electron-linux", "rename:electron"]);
	grunt.registerTask("init-electron-without-download", ["clean:electron", "unzip:electron-win", "unzip:electron-darwin", "unzip:electron-linux", "rename:electron"]);

	grunt.registerTask("electron", ["default", "init-electron-without-download", "copy:electron-win", "copy:electron-darwin", "copy:electron-linux"]);

	grunt.registerTask("default", ["clean:build", "browserify:build", "exorcise"]);
};

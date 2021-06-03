
const fs = require("fs");
const del = require('del');

const config = {
    source: ["./tokens.json"],
    platforms: {
        /*
        css: {
            transformGroup: "css",
            buildPath: "./build/css/",
            files: [{
            destination: "_tokens.css",
            format: "css/variables"
            }]
        },*/
        js: {
            transformGroup: "js",
            buildPath: "./build/web/",
            files: [{
            destination: "_tokens.js",
            format: "javascript/module"
            }]
        }

    }
}

const styleDictionary = require('style-dictionary').extend(config);

async function run() {
    await del('./build');
    await styleDictionary.buildAllPlatforms();
    fs.copyFile('./tailwind.config.js', './build/web/tailwindTheme.js', (err) => {
        if (err) throw err;
        console.log('tailwind.config was copied to destination.txt');
      });
    console.log(`Build Dictionary done (${new Date().toLocaleTimeString()})`);
    console.log();
}

run()
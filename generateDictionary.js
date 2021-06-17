
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
            destination: "tokens.js",
            format: "javascript/module"
            }]
        }

    }
}

const styleDictionary = require('style-dictionary').extend(config);

async function run() {
    await del('./build');
    await styleDictionary.buildAllPlatforms();
    fs.rename('./tokens.json', './build/tokens.json', (err) => {
        if (err) throw err;
        console.log('tokens.json was moved to destination');
      });
    fs.copyFile('./tailwind/tailwind.config.js', './build/web/tailwindTheme.js', (err) => {
        if (err) throw err;
        console.log('tailwind.config was copied to destination');
      });
      fs.copyFile('./tailwind/tailwindImport.config.js', './build/web/tailwindThemeImport.js', (err) => {
        if (err) throw err;
        console.log('tailwindImport.config was copied to destination');
      });
    console.log(`Build Dictionary done (${new Date().toLocaleTimeString()})`);
    console.log();
}


run()

const fs = require("fs");
const fetch = require('node-fetch');


let figmaTree;
let designTokens;

// get colors from styles artboard
function getColors(stylesArtboard) {
    const colors = {};
    const colorsArtboard = stylesArtboard.filter(style => {
        return style.name === "Color";
    })[0].children;

    colorsArtboard.map(color => {

        // filter comments
        if(color.type == 'TEXT') {
            return
        }
        function rgba(val) {
            return Math.floor(val * 255);
        }

        // convert fill to rgba
        let fill = color.fills[0];

        let r = rgba(fill.color.r)
        let g = rgba(fill.color.g)
        let b = rgba(fill.color.b)
        let a = fill?.opacity ? fill.opacity.toFixed(2) : '1';

        colors[color.name] = {
            value: `rgba(${r}, ${g}, ${b}, ${a})`,
            type: "color"
        }
    });
    return colors;
}

// get font from styles artboard
function getFont(stylesArtboard) {
    const font = {};
    const fontArtboard = stylesArtboard.filter(style => {
        return style.name === "Typography";
    })[0].children;

    fontArtboard.map(fontComponentSet => {
       fontComponentSet.children.forEach(fontComponent => {
        console.log(fontComponent);
            let name = fontComponent.name.split("=")[1]
            fontVariation = fontComponent.children[0];
            font[name] = {
                family: {
                    value: `${fontVariation.style.fontFamily}`,
                    type: "typography"
                },
                size: {
                    value: `${fontVariation.style.fontSize}px`,
                    type: "typography"
                },
                lineheight: {
                    value: `${fontVariation.style.lineHeightPx}px`,
                    type: "typography"
                }
            }
       });
    });
    
    return font;
}


// get font from styles artboard
function getSpacing(stylesArtboard) {
    const spacing = {
        0: {
            "value": "0px",
            "type": "space"
        },
    };
    const spacingArtboard = stylesArtboard.filter(style => {
        return style.name === "Spacing";
    })[0].children;
    
    spacingArtboard.map(space => {
        // filter comments
        if(space.type == 'TEXT') {
            return
        }

        spacing[space.name] = {
            value: `${space.absoluteBoundingBox.height}px`,
            type: "space"
        }
    });
    return spacing;
}

// get border styles from styles artboard
function getBorders(stylesArtboard) {
    const borders = {};
    const bordersArtboard = stylesArtboard.filter(style => {
        return style.name === "Border";
    })[0].children;
    
    bordersArtboard.map(border => {
        // filter comments
        if(border.type == 'TEXT') {
            return
        }

        borders[border.name] = {
            value: `${border.strokeWeight}px`,
            type: "border"
        }
    });
    return borders;
}

// get breakpoints from styles artboard
function getBreakPoints(stylesArtboard) {
    const breakPoints = {};
    const breakPointsArtboard = stylesArtboard.filter(style => {
        return style.name === "Breakpoints";
    })[0].children;
    
    breakPointsArtboard.map(breakPoint => {
        // filter comments
        if(breakPoint.type == 'TEXT') {
            return
        }

        breakPoints[breakPoint.name] = {
            value: `${breakPoint.absoluteBoundingBox.width}px`,
            type: "breakPoint"
        }
    });
    return breakPoints;
}

// get grid from styles artboard
function getGrid(stylesArtboard) {
    const grid = {};
    const gridArtboard = stylesArtboard.filter(style => {
        return style.name === "Grid";
    })[0].children;
    
    gridArtboard.map(gridVariant => {
        // filter comments
        if(gridVariant.type == 'TEXT') {
            return
        }

        grid[gridVariant.name] = {
            value: `${gridVariant.children.length}`,
            type: "count"
        }
    });
    return grid;
}

// get figma json
const figmaApiToken = "189840-58838f90-2466-48a1-9634-2006f1332482"
const figmaId = "kGm31xFt0PUcFsiqSzdwk0"
async function getFigmaTree() {
    const query = "https://api.figma.com/v1/files/" + figmaId;
    const result = await fetch(query, {
        method: "GET",
        headers: {
            "X-Figma-Token": figmaApiToken
        }
    });
    figmaTree = await result.json();
}

function setDesignTokens() {
    // filter for styles page
    const stylesArtboard = figmaTree.document.children.filter(item => {
        return item.name === "Styles";
    })[0].children;

    designTokens = {
        colors: {},
        font: {},
        spacing: {},
        borders: {},
        breakPoints: {},
        grid: {}
    };

    // populate design tokens
    designTokens.colors = getColors(stylesArtboard);
    designTokens.font = getFont(stylesArtboard);
    designTokens.spacing = getSpacing(stylesArtboard);
    designTokens.borders = getBorders(stylesArtboard);
    designTokens.breakPoints = getBreakPoints(stylesArtboard);
    designTokens.grid = getGrid(stylesArtboard);
}

async function writeJsonFile() {
    await fs.writeFile("tokens.json", JSON.stringify(designTokens, null, 2), err => {
        if (err) throw err; 
    });
}


// run script
async function run() {

    await getFigmaTree();

    setDesignTokens();

    await writeJsonFile();

    console.log(`Generate Token done (${new Date().toLocaleTimeString()})`);
    console.log();
}

run()


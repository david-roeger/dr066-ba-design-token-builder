const {
  colors,
  font,
  spacing,
  borders,
  breakPoints,
  grid,
} = require("./tokens");

// get Colors
let colorObj = {};
for (const element in colors) {
  colorObj[element] = colors[element].value;
}

// get Fonts
let fontObj = {
  fontFamily: {},
  size: {},
  lineHeight: {},
};
for (const element in font) {
  if (font[element].family) {
    fontObj.fontFamily[font[element].family.value.toLowerCase()] =
      font[element].family.value;
  }
  fontObj.size[element] = font[element].size.value;
  fontObj.lineHeight[element] = font[element].lineheight.value;
}

// get Spacing
let spacingObj = {};
for (const element in spacing) {
  spacingObj[element] = spacing[element].value;
}

// get Borders
let bordersObj = {};
for (const element in borders) {
  bordersObj[element] = borders[element].value;
}

// get Breakpoints
let breakPointsObj = {};
for (const element in breakPoints) {
  breakPointsObj[element] = breakPoints[element].value;
}

// get Grid
let gridObj = {};
for (const element in grid) {
  gridObj[element] = `repeat(${grid[element].value}, minmax(0, 1fr))`;
}

module.exports = {
  screens: {
    ...breakPointsObj,
  },
  colors: {
    ...colorObj,
  },
  fontSize: {
    ...fontObj.size,
  },
  lineHeight: {
    ...fontObj.lineHeight,
  },
  spacing: {
    ...spacingObj,
  },
  borderWidth: {
    ...bordersObj,
  },
  ringWidth: {
    ...bordersObj,
  },
  extend: {
    fontFamily: {
      ...fontObj.fontFamily,
    },
    borderRadius: {
      ...spacingObj,
    },
    gridTemplateColumns: {
      ...gridObj,
    },
  },
};

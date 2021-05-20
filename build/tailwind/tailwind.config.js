const { colors, font, spacing, breakPoints, grid } = require('./_tokens');

// get Colors
let colorObj = {}
for (const element in colors) {
  colorObj[element] = colors[element].value
}

// get Fonts
let fontObj = {
  fontFamily: {},
  size: {},
  lineHeight: {}
}
for (const element in font) {
  if(font[element].family) {
      fontObj.fontFamily[font[element].family.value.toLowerCase()] = font[element].family.value
  }
  fontObj.size[element] = font[element].size.value
  fontObj.lineHeight[element] = font[element].lineheight.value
}

// get Spacing
let spacingObj= {}
for (const element in spacing) {
  spacingObj[element] = spacing[element].value
}

// get Breakpoints
let breakPointsObj = {}
for (const element in breakPoints) {
  breakPointsObj[element] = breakPoints[element].value
}

// get Grid
let gridObj= {}
for (const element in grid) {
  gridObj[element] = `repeat(${grid[element].value}, minmax(0, 1fr))`
}

console.log(gridObj); 
module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {
    screens: {
      ...breakPointsObj
    },
    colors: {
      ...colorObj
    },
    fontSize: {
      ...fontObj.size
    },
    lineHeight: {
      ...fontObj.lineHeight
    },
    spacing: {
        ...spacingObj
    },
    extend: {
      fontFamily: {
        ...fontObj.fontFamily
      },
      gridTemplateColumns: {
        ...gridObj
      }
    }
  },
  variants: {},
  plugins: [],
}
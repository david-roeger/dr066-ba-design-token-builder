const { iconReference } = require('./_tokens');

let iconObj = {}
iconObj.types = iconReference.types.value.split(";");
iconObj.colors = iconReference.colors.value.split(";");

module.exports = {
  iconReference: iconObj
}
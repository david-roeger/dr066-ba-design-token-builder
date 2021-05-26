import { iconReference } from './_tokens'

let iconObj = {}
iconObj.types = iconReference.types.value.split(";");
iconObj.colors = iconReference.colors.value.split(";");

export default {
  iconReference: iconObj
}
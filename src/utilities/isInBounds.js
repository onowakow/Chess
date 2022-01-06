export default function isInBounds (location) {
  // location is simple [x, y]
  if (location[0] < 8 && location[1] < 8 && location[0] >= 0 && location[1] >=0) {
    return true
  } else {
    return false
  }
}
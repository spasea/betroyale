class Coordinates {
  static execute (exit, roomCoordinates) {
    return {
      x: roomCoordinates.x + exit.x,
      y: roomCoordinates.y + exit.y,
    }
  }
}

export default Coordinates

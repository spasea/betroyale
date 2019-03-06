class LocationRoomDTO {
  static execute (locationId, roomId, roomCoordinates) {
    return {
      locationId,
      roomId,
      roomCoordinates
    }
  }
}

export default LocationRoomDTO

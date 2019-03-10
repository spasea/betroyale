import React, { Component } from 'react'
import { connect } from 'react-redux'
import { locationExists } from '../config'

import { useEvent } from '../redux/actions/Events'
import { addLocationRoom } from '../redux/actions/Locations'
import { updateMaxCoordinates } from '../redux/actions/Common'
import { addExits, placeRoom, useRoom } from '../redux/actions/Rooms'

import LocationRoomDTO from '../DTO/LocationRoomDTO'
import CoordinatesService from '../Services/Room/Coordinates'
import RoomEntity from '../Enteties/Room'

import Alert from '../Services/Alert'
import Random from '../Services/Random'
import Room from './Room'

const mapStateToProps = state => ({
  Common: state.Common,
  Locations: state.Locations,
  Rooms: state.Rooms,
  Events: state.Events,
})

const mapDispatchToProps = dispatch => ({
  useRoom: id => dispatch(useRoom(id)),
  addExits: (id, exits) => dispatch(addExits({ id, exits })),
  placeRoom: info => dispatch(placeRoom(info)),
  addLocationRoom: info => dispatch(addLocationRoom(info)),
  useEvent: id => dispatch(useEvent(id)),
  updateMaxCoordinates: coordinates => dispatch(updateMaxCoordinates(coordinates)),
})

class Location extends Component {
  get currentLocation () {
    return this.props.Locations.find(location => location.id === this.props.id) || {
      roomsCoordinates: [],
    }
  }

  get relatedRooms () {
    return this.props.Rooms.filter(room => room.relatedLocations.includes(this.props.id))
  }

  get availableRooms () {
    return this.relatedRooms.filter(room => !room.isUsed)
  }

  get usedRooms () {
    return this.relatedRooms.filter(room => room.isUsed && this.props.roomsList.includes(room.id))
  }

  get exits () {
    return this.props.exits ? {
      [locationExists.TOP]: this.props.exits.filter(exit => exit.position === locationExists.TOP),
      [locationExists.MIDDLE]: this.props.exits.filter(exit => exit.position === locationExists.MIDDLE),
      [locationExists.BOTTOM]: this.props.exits.filter(exit => exit.position === locationExists.BOTTOM),
    } : {}
  }

  useEvents = room => {
    this.props.Events.forEach(event => {
      if (!room.events.includes(event.id) || event.isUsed) {
        return
      }

      this.props.useEvent(event.id)
      Alert.execute(`${event.type}: ${event.title}\n${event.description}`)
    })
  }

  updateCommonCoordinates = roomCoordinates => {
    roomCoordinates.x = Math.abs(roomCoordinates.x)
    roomCoordinates.y = Math.abs(roomCoordinates.y)

    const newCoordinates = {
      x: Math.max(roomCoordinates.x, this.props.Common.maxCoordinates.x),
      y: Math.max(roomCoordinates.y, this.props.Common.maxCoordinates.y)
    }

    this.props.updateMaxCoordinates(newCoordinates)
  }

  addRoom = async (exit, roomCoordinates) => {
    const room = this.availableRooms[Random.integer(0, this.availableRooms.length - 1)]

    if (!room) {
      Alert.execute(`No more rooms for this location`)

      return
    }

    const coordinates = CoordinatesService.execute(exit, roomCoordinates)
    this.props.useRoom(room.id)
    await this.props.placeRoom({ id: room.id, coordinates })

    const roomUsed = this.props.Rooms.find(usedRoom => usedRoom.id === room.id)

    const RoomInstance = new RoomEntity(roomUsed)
    RoomInstance.setRandomService(Random)
    RoomInstance.mainEntry = exit
    RoomInstance.setRoomsList(this.currentLocation.roomsCoordinates)

    const instEx = RoomInstance.generateExits()

    this.props.addExits(room.id, instEx)
    this.props.addLocationRoom(LocationRoomDTO.execute(this.props.id, room.id, coordinates))
    this.updateCommonCoordinates({ ...coordinates })
    this.useEvents(room)
  }

  render() {
    return (
      <div>
        <Room exits={this.exits[locationExists.TOP]} coordinates={{ x: 0, y: -1 }} addRoom={this.addRoom}
              image={this.props.image[0]}
        />
        <Room exits={this.exits[locationExists.MIDDLE]} coordinates={{ x: 0, y: 0 }} addRoom={this.addRoom}
              image={this.props.image[1]}
        />
        <Room exits={this.exits[locationExists.BOTTOM]} coordinates={{ x: 0, y: 1 }} addRoom={this.addRoom}
              image={this.props.image[2]}
        />

        {
          this.usedRooms && this.usedRooms.map(room =>
            <Room key={room.id} {...room} addRoom={this.addRoom} />
          )
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)

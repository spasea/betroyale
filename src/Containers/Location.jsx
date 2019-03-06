import React, { Component } from 'react'
import { connect } from 'react-redux'
import { locationExists } from '../config'

import { useEvent } from '../redux/actions/Events'
import { addLocationRoom } from '../redux/actions/Locations'
import { updateMaxCoordinates } from '../redux/actions/Common'
import { placeRoom, useRoom } from '../redux/actions/Rooms'

import LocationRoomDTO from '../DTO/LocationRoomDTO'

import Alert from '../Services/Alert'
import Room from './Room'

const mapStateToProps = state => ({
  Common: state.Common,
  Locations: state.Locations,
  Rooms: state.Rooms,
  Events: state.Events,
})

const mapDispatchToProps = dispatch => ({
  useRoom: id => dispatch(useRoom(id)),
  placeRoom: info => dispatch(placeRoom(info)),
  addLocationRoom: info => dispatch(addLocationRoom(info)),
  useEvent: id => dispatch(useEvent(id)),
  updateMaxCoordinates: coordinates => dispatch(updateMaxCoordinates(coordinates)),
})

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

class Location extends Component {
  getNewCoordinates = (exit, roomCoordinates) => ({
    x: roomCoordinates.x + exit.x,
    y: roomCoordinates.y + exit.y,
  })

  get currentLocation () {
    return this.props.Locations.find(location => location.id === this.props.id) || {
      roomsCoordinates: [],
    }
  }

  useEvents = (room) => {
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

  getNearbyRooms (coordinates) {
    const satisfyingCoordinates = {
      x: [
        coordinates.x + 1,
        coordinates.x,
        coordinates.x - 1,
      ],
      y: [
        coordinates.y + 1,
        coordinates.y,
        coordinates.y - 1,
      ]
    }

    const filteredRooms = this.currentLocation.roomsCoordinates.filter(roomCoordinates =>
      satisfyingCoordinates.x.includes(roomCoordinates.x) && satisfyingCoordinates.y.includes(roomCoordinates.y)
    )

    const compareCoordinates = (coordinates, roomCoordinates) =>
      coordinates.x === roomCoordinates.x && coordinates.y === roomCoordinates.y

    const hasTop = !!filteredRooms.find(room => compareCoordinates({ x: coordinates.x, y: coordinates.y - 1 }, room))
    const hasBottom = !!filteredRooms.find(room => compareCoordinates({ x: coordinates.x, y: coordinates.y + 1 }, room))
    const hasLeft = !!filteredRooms.find(room => compareCoordinates({ x: coordinates.x - 1, y: coordinates.y }, room))
    const hasRight = !!filteredRooms.find(room => compareCoordinates({ x: coordinates.x + 1, y: coordinates.y }, room))

    return {
      hasBottom,
      hasTop,
      hasLeft,
      hasRight,
    }
  }

  generateRoomExits = () => {

  }

  addRoom = (exit, roomCoordinates) => {
    const room = this.availableRooms[random(0, this.availableRooms.length - 1)]

    if (!room) {
      Alert.execute(`No more rooms for this location`)

      return
    }

    const coordinates = this.getNewCoordinates(exit, roomCoordinates)

    const hasNearbyRooms = this.getNearbyRooms(coordinates)

    this.props.useRoom(room.id)
    this.props.placeRoom({ id: room.id, coordinates })
    this.props.addLocationRoom(LocationRoomDTO.execute(this.props.id, room.id, coordinates))

    this.updateCommonCoordinates({ ...coordinates })

    this.useEvents(room)
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

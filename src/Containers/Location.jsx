import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'

import { locationExists } from '../config'
import {
  placeRoom,
  useRoom,
} from '../redux/actions/Rooms'

const mapStateToProps = state => ({
  Common: state.Common,
  Rooms: state.Rooms,
})

const mapDispatchToProps = dispatch => ({
  useRoom: id => dispatch(useRoom(id)),
  placeRoom: info => dispatch(placeRoom(info)),
})

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

class Location extends Component {
  addRoom = (exit, roomCoordinates) => {
    const room = this.availableRooms[random(0, this.availableRooms.length - 1)]

    console.log({
      room,
      avail: this.availableRooms,
    })

    if (!room) {
      return
    }

    const coordinates = {
      x: roomCoordinates.x + exit.x,
      y: roomCoordinates.y + exit.y,
    }

    this.props.useRoom(room.id)
    this.props.placeRoom({ id: room.id, coordinates })
  }

  get relatedRooms () {
    return this.props.Rooms.filter(room => room.relatedLocations.includes(this.props.id))
  }

  get availableRooms () {
    return this.relatedRooms.filter(room => !room.isUsed)
  }

  get usedRooms () {
    return this.relatedRooms.filter(room => room.isUsed)
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
        <Room exits={this.exits[locationExists.TOP]} coordinates={{ x: 0, y: -1 }} addRoom={this.addRoom} />
        <Room exits={this.exits[locationExists.MIDDLE]} coordinates={{ x: 0, y: 0 }} addRoom={this.addRoom} />
        <Room exits={this.exits[locationExists.BOTTOM]} coordinates={{ x: 0, y: 1 }} addRoom={this.addRoom} />

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

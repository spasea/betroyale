import {
  addLocationRoom,
  addLocations,
} from '../actions/Locations'
import Locations from './Locations'

import LocationRoomDTO from '../../DTO/LocationRoomDTO'

describe('basic', () => {
  it('should init correctly', () => {
    const locationsList = [
      {
        id: 1,
        title: 'test'
      }
    ]

    const result = Locations([], addLocations(locationsList))

    expect(result).toEqual(locationsList)
  })
})

describe('add room to the location', () => {
  const initialState = [
    {
      id: 1,
      title: 'This is a title',
      roomsList: [],
      roomsCoordinates: [],
    },
    {
      id: 2,
      title: 'This is a second title',
      roomsList: [],
      roomsCoordinates: [],
    },
  ]

  it('should add room id to a location if location id is correct', () => {
    const roomId = 21
    const result = Locations(initialState, addLocationRoom(LocationRoomDTO.execute(1, roomId, { x: 1, y: 1 })))

    expect(result).toEqual([
      {
        id: 2,
        title: 'This is a second title',
        roomsList: [],
        roomsCoordinates: [],
      },
      {
        id: 1,
        title: 'This is a title',
        roomsList: [
          roomId
        ],
        roomsCoordinates: [
          {
            id: roomId,
            x: 1,
            y: 1,
          }
        ],
      },
    ])
  })

  it('should not add room id to a location if location id is incorrect', () => {
    const roomId = 21
    const result = Locations(initialState, addLocationRoom(LocationRoomDTO.execute(10, roomId, { x: 1, y: 1 })))

    expect(result).toEqual(initialState)
  })

  it('should not add room id to a location if room is already exists in the list', () => {
    const localState = [...initialState]
    localState[0].roomsList = [21]

    const roomId = 21
    const result = Locations(initialState, addLocationRoom(LocationRoomDTO.execute(1, roomId, { x: 1, y: 1 })))

    expect(result).toEqual(localState)
  })
})
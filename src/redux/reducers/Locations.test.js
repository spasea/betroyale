import {
  addLocationRoom,
  addLocations,
} from '../actions/Locations'
import Locations from './Locations'

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
    },
    {
      id: 2,
      title: 'This is a second title',
      roomsList: [],
    },
  ]

  it('should add room id to a location if location id is correct', () => {
    const roomId = 21
    const result = Locations(initialState, addLocationRoom({ locationId: 1, roomId }))

    expect(result).toEqual([
      {
        id: 2,
        title: 'This is a second title',
        roomsList: [],
      },
      {
        id: 1,
        title: 'This is a title',
        roomsList: [
          roomId
        ],
      },
    ])
  })

  it('should not add room id to a location if location id is incorrect', () => {
    const roomId = 21
    const result = Locations(initialState, addLocationRoom({ locationId: 10, roomId }))

    expect(result).toEqual(initialState)
  })

  it('should not add room id to a location if room is already exists in the list', () => {
    const localState = [...initialState]
    localState[0].roomsList = [21]

    const roomId = 21
    const result = Locations(initialState, addLocationRoom({ locationId: 1, roomId }))

    expect(result).toEqual(localState)
  })
})
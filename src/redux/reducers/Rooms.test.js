import {
  addRooms,
  placeRoom,
  useRoom,
} from '../actions/Rooms'
import Rooms from './Rooms'

describe('basic', () => {
  it('should init correctly', () => {
    const roomsList = [
      {
        id: 1,
        title: 'test'
      }
    ]

    const result = Rooms([], addRooms(roomsList))

    expect(result).toEqual(roomsList)
  })
})

describe('use room', () => {
  const initialState = [
    {
      id: 1,
      title: 'This is a title',
      isUsed: false,
    },
    {
      id: 2,
      title: 'This is a second title',
      isUsed: true,
    },
  ]

  it('should toggle isUsed property if id is correct', () => {
    const result = Rooms(initialState, useRoom(1))

    expect(result).toEqual([
      {
        id: 2,
        title: 'This is a second title',
        isUsed: true,
      },
      {
        id: 1,
        title: 'This is a title',
        isUsed: true,
      },
    ])
  })

  it('should change nothing if id is incorrect', () => {
    const result = Rooms(initialState, useRoom(4))

    expect(result).toEqual(initialState)
  })
})

describe('playing the room', () => {
  const initialState = [
    {
      id: 1,
      title: 'This is a title',
      isUsed: false,
    },
    {
      id: 2,
      title: 'This is a second title',
      coordinates: {
        x: 2,
        y: 1,
      },
      isUsed: true,
    },
  ]

  it('should add coordinates if the id is correct', () => {
    const coordinates = { x: 1, y: 2 }
    const result = Rooms(initialState, placeRoom({ id: 1, coordinates }))

    expect(result).toEqual([
      {
        id: 2,
        title: 'This is a second title',
        coordinates: {
          x: 2,
          y: 1,
        },
        isUsed: true,
      },
      {
        id: 1,
        title: 'This is a title',
        isUsed: false,
        coordinates,
      },
    ])
  })

  it('should add nothing if id is incorrect', () => {
    const coordinates = { x: 1, y: 2 }
    const result = Rooms(initialState, placeRoom({ id: 4, coordinates }))

    expect(result).toEqual(initialState)
  })
})
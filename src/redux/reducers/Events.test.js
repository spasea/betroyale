import { addEvents, useEvent } from '../actions/Events'
import Events from './Events'

describe('basic', () => {
  it('should init correctly', () => {
    const eventsList = [
      {
        id: 1,
        title: 'test'
      }
    ]

    const result = Events([], addEvents(eventsList))

    expect(result).toEqual(eventsList)
  })
})

describe('use event', () => {
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
    const result = Events(initialState, useEvent(1))

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
    const result = Events(initialState, useEvent(4))

    expect(result).toEqual(initialState)
  })
})

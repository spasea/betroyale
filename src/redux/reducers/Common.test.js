import { updateMaxCoordinates } from '../actions/Common'
import Common from './Common'

describe('basic', () => {
  it('should update max coordinates', () => {
    const initState = {
      maxCoordinates: {
        x: 0,
        y: 0
      }
    }

    const maxCoordinates = {
      x: 2,
      y: 3,
    }

    const result = Common(initState, updateMaxCoordinates(maxCoordinates))

    expect(result).toEqual({ maxCoordinates })
  })
})

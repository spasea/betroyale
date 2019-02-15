import { UPDATE_MAX_COORINATES } from '../ActionTypes'

const initialState = {
  blockSize: {
    height: 100,
    width: 100,
  },
  maxCoordinates: {
    x: 0,
    y: 1,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAX_COORINATES:
      return {
        ...state,
        maxCoordinates: action.payload,
      }

    default:
      return state
  }
}

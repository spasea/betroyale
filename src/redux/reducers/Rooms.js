import {
  ADD_ROOMS,
} from '../ActionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ROOMS:
      return action.payload

    default:
      return state
  }
}

import {
  ADD_LOCATIONS,
} from '../ActionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_LOCATIONS:
      return action.payload

    default:
      return state
  }
}

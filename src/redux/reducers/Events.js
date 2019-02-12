import {
  ADD_EVENTS,
} from '../ActionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_EVENTS:
      return action.payload

    default:
      return state
  }
}

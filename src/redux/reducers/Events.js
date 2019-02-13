import {
  ADD_EVENTS,
  USE_EVENT,
} from '../ActionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_EVENTS:
      return action.payload

    case USE_EVENT:
      const eventId = +action.payload
      const event = state.find(event => +event.id === eventId)

      if (!event) {
        return state
      }

      return [
        ...state.filter(event => +event.id !== eventId),
        {
          ...event,
          isUsed: !event.isUsed,
        }
      ]

    default:
      return state
  }
}

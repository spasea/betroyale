import {
  ADD_LOCATION_ROOM,
  ADD_LOCATIONS,
} from '../ActionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_LOCATIONS:
      return action.payload

    case ADD_LOCATION_ROOM:
      const locationId = +action.payload.locationId
      const roomId = +action.payload.roomId
      const location = state.find(location => +location.id === locationId)

      if (!location) {
        return state
      }

      if (location.roomsList.includes(roomId)) {
        return state
      }

      return [
        ...state.filter(location => +location.id !== locationId),
        {
          ...location,
          roomsList: [
            ...location.roomsList,
            roomId,
          ]
        }
      ]

    default:
      return state
  }
}

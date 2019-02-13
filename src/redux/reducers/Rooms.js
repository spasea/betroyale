import {
  ADD_ROOMS,
  USE_ROOM,
  PLACE_ROOM,
} from '../ActionTypes'

const changeRoomProp = (state, roomId, [title, value]) => {
  const room = state.find(room => +room.id === +roomId)

  if (!room) {
    return state
  }

  return [
    ...state.filter(room => +room.id !== +roomId),
    {
      ...room,
      [title]: value,
    }
  ]
}

export default (state = [], action) => {
  switch (action.type) {
    case ADD_ROOMS:
      return action.payload

    case USE_ROOM:
      return changeRoomProp(state, action.payload.id, ['isUsed', action.payload.isUsed] )

    case PLACE_ROOM:
      return changeRoomProp(state, action.payload.id, ['coordinates', action.payload.coordinates] )

    default:
      return state
  }
}

import {
  ADD_ROOMS,
  USE_ROOM,
  PLACE_ROOM, ADD_EXITS,
} from '../ActionTypes'

const getRoom = (state, roomId) =>
  state.find(room => +room.id === +roomId)

const changeRoomProp = (state, roomId, [title, value]) => {
  const room = getRoom(state, roomId)

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
  const roomProps = {
    coordinates: 'coordinates',
    exits: 'exits',
  }

  switch (action.type) {
    case ADD_ROOMS:
      return action.payload

    case USE_ROOM:
      const roomId = +action.payload
      const room = getRoom(state, roomId)

      if (!room) {
        return state
      }

      return [
        ...state.filter(room => +room.id !== roomId),
        {
          ...room,
          isUsed: !room.isUsed,
        }
      ]

    case PLACE_ROOM:
      return changeRoomProp(state, action.payload.id, [roomProps.coordinates, action.payload.coordinates] )

    case ADD_EXITS:
      return changeRoomProp(state, action.payload.id, [roomProps.exits, action.payload.exits])

    default:
      return state
  }
}

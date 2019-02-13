import {
  ADD_ROOMS,
  USE_ROOM,
  PLACE_ROOM,
} from '../ActionTypes'

import Http from '../../Services/Http'
import { rooms } from '../../config'

export const addRooms = payload => ({
  type: ADD_ROOMS,
  payload
})

export const AddRooms = () => async dispatch => {
  const { data } = await Http.execute(rooms, 'get')

  const roomsList = data.map(room => ({
    ...room,
    isUsed: false,
    coordinates: {},
  }))

  dispatch(addRooms(roomsList))
}

export const useRoom = payload => ({
  type: USE_ROOM,
  payload
})

export const placeRoom = payload => ({
  type: PLACE_ROOM,
  payload
})

import {
  ADD_ROOMS,
} from '../ActionTypes'

import config from '../../config'
import axios from 'axios'

export const addRooms = payload => ({
  type: ADD_ROOMS,
  payload
})

export const AddRooms = () => async dispatch => {
  const { data } = await axios.get(config[process.env.NODE_ENV].rooms.get.url)

  dispatch(addRooms(data))
}

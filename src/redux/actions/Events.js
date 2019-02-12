import {
  ADD_EVENTS,
} from '../ActionTypes'

import config from '../../config'
import axios from 'axios'

export const addEvents = payload => ({
  type: ADD_EVENTS,
  payload
})

export const AddEvents = () => async dispatch => {
  const { data } = await axios.get(config[process.env.NODE_ENV].events.get.url)

  dispatch(addEvents(data))
}

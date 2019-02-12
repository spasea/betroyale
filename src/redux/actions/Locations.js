import {
  ADD_LOCATIONS,
} from '../ActionTypes'

import config from '../../config'
import axios from 'axios'

export const addLocations = payload => ({
  type: ADD_LOCATIONS,
  payload
})

export const AddLocations = () => async dispatch => {
  const { data } = await axios.get(config[process.env.NODE_ENV].locations.get.url)

  dispatch(addLocations(data))
}

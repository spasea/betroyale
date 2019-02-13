import {
  ADD_LOCATIONS,
} from '../ActionTypes'

import Http from '../../Services/Http'
import { locations } from '../../config'

export const addLocations = payload => ({
  type: ADD_LOCATIONS,
  payload
})

export const AddLocations = () => async dispatch => {
  const { data } = await Http.execute(locations, 'get')

  // Http.execute(locations, 'post', { params: { a: 1 } })
  // Http.execute(locations, 'put', { params: { a: 4 }, replace: { __ID__: 5 } })
  // Http.execute(locations, 'delete', { replace: { __ID__: 5 } })

  const locationsList = data.map(location => ({
    ...location,
    roomsList: [],
  }))

  dispatch(addLocations(locationsList))
}

import {
  ADD_LOCATIONS,
  ADD_LOCATION_ROOM,
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
    roomsCoordinates: [
      {
        x: 0,
        y: 0,
      },
      {
        x: 0,
        y: -1,
      },
      {
        x: 0,
        y: 1,
      },
    ],
  }))

  dispatch(addLocations(locationsList))
}

export const addLocationRoom = payload => ({
  type: ADD_LOCATION_ROOM,
  payload
})

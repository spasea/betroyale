import {
  ADD_EVENTS,
  USE_EVENT,
} from '../ActionTypes'

import Http from '../../Services/Http'
import { events } from '../../config'

export const addEvents = payload => ({
  type: ADD_EVENTS,
  payload
})

export const AddEvents = () => async dispatch => {
  const { data } = await Http.execute(events, 'get')

  const eventsList = data.map(event => ({
    ...event,
    isUsed: false,
  }))

  dispatch(addEvents(eventsList))
}

export const useEvent = payload => ({
  type: USE_EVENT,
  payload
})

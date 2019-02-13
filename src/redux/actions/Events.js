import {
  ADD_EVENTS,
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

import { combineReducers } from 'redux'

import Locations from './Locations'
import Rooms from './Rooms'
import Events from './Events'

export default combineReducers({
  Locations,
  Rooms,
  Events,
})

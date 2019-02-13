import { combineReducers } from 'redux'

import Locations from './Locations'
import Rooms from './Rooms'
import Events from './Events'
import Common from './Common'

export default combineReducers({
  Locations,
  Rooms,
  Events,
  Common,
})

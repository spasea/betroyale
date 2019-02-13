import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AddEvents } from './redux/actions/Events'
import { AddLocations } from './redux/actions/Locations'
import { AddRooms } from './redux/actions/Rooms'

import Pane from './Containers/Pane'

const mapDispatchToProps = dispatch => ({
  AddLocations: () => dispatch(AddLocations()),
  AddRooms: () => dispatch(AddRooms()),
  AddEvents: () => dispatch(AddEvents()),
})

class App extends Component {
  componentDidMount() {
    this.props.AddLocations()
    this.props.AddRooms()
    this.props.AddEvents()
  }

  render() {
    return (
      <div className="App" ref={this.appRef}>
        <Pane />
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)

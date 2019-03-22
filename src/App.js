import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AddEvents } from './redux/actions/Events'
import { AddLocations } from './redux/actions/Locations'
import { AddRooms } from './redux/actions/Rooms'

import Pane from './Containers/Pane'

const mapStateToProps = state => ({
  Common: state.Common,
})

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

    console.log('just a test here')
  }

  render() {
    const {
      blockSize,
      maxCoordinates,
    } = this.props.Common

    const width = `${(maxCoordinates.x + 1) * 2 * blockSize.width}px`
    const height = `${(maxCoordinates.y + 1) * 2 * blockSize.height}px`

    return (
      <div className="App" style={{
        width,
        height
      }}>
        <Pane />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

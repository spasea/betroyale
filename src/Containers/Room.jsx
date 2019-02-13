import React, { Component } from 'react'
import { connect } from 'react-redux'

import RoomView from '../Views/Room'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

class Room extends Component {
  state = {
    modifiers: [
      {
        x: 0,
        y: -1,
        className: 'block__side--is-top',
      },
      {
        x: 0,
        y: 1,
        className: 'block__side--is-bottom',
      },
      {
        x: -1,
        y: 0,
        className: 'block__side--is-left',
      },
      {
        x: 1,
        y: 0,
        className: 'block__side--is-right',
      },
    ]
  }

  getExit = coordinates => {
    return this.state.modifiers.find(modifier => modifier.x === coordinates.x && modifier.y === coordinates.y)
  }

  get margins () {
    const { x, y } = this.props.coordinates
    const blockSize = { width: 100, height: 100 }

    return {
      marginLeft: blockSize.width * x,
      marginTop: blockSize.height * y,
    }
  }

  render() {
    return (
      <RoomView coordinates={this.props.coordinates}
                exits={this.props.exits}
                addRoom={this.props.addRoom}
                getExit={this.getExit}
                margins={this.margins}
      />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)

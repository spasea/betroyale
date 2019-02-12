import React, { Component } from 'react'
import { connect } from 'react-redux'

import Block from './Block'

import {
  AddLocations,
} from './redux/actions/Locations'

export const blockSize = {
  width: 100,
  height: 143
}

const mapDispatchToProps = dispatch => ({
  AddLocations: () => dispatch(AddLocations()),
})

class App extends Component {
  constructor () {
    super()

    this.appRef = React.createRef()

    this.state = {
      blocks: [
        // {
        //   x: 0,
        //   y: 5,
        // },
        {
          x: 0,
          y: 0,
        },
        // {
        //   x: 0,
        //   y: -5,
        // },
        // {
        //   x: 5,
        //   y: 0,
        // },
        // {
        //   x: -5,
        //   y: 0,
        // },
        // {
        //   x: -1,
        //   y: 0,
        // },
        // {
        //   x: -2,
        //   y: 0,
        // },
        // {
        //   x: -3,
        //   y: 0,
        // },
        // {
        //   x: -3,
        //   y: -1,
        // },
      ],
      extremePositions: {
        right: 1,
        bottom: 1,
      }
    }
  }

  addBlock = nextCoordinates => {
    const {
      blocks,
      extremePositions,
    } = this.state

    const nextExtreme = {
      right: extremePositions.right < Math.abs(nextCoordinates.x) ? Math.abs(nextCoordinates.x) : extremePositions.right,
      bottom: extremePositions.bottom < Math.abs(nextCoordinates.y) ? Math.abs(nextCoordinates.y) : extremePositions.bottom,
    }

    this.updateSize(nextExtreme)

    this.setState({
      blocks: [
        ...blocks,
        nextCoordinates,
      ],
      extremePositions: {
        ...extremePositions,
        ...nextExtreme,
      }
    })
  }

  updateSize = extremePositions => {
    const width = (extremePositions.right * 2 + 2) * blockSize.width
    const height = (extremePositions.bottom * 2 + 2) * blockSize.height

    this.appRef.current.style.width = `${width}px`
    this.appRef.current.style.height = `${height}px`
  }

  componentDidMount() {
    this.props.AddLocations()
    this.updateSize(this.state.extremePositions)
  }

  render() {
    const {
      blocks
    } = this.state

    return (
      <div className="App" ref={this.appRef}>
        {
          blocks.map((block, idx) =>
            <Block coordinates={block} key={idx} handler={this.addBlock} />
          )
        }
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)

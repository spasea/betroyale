import React, { Component } from 'react'

import Block from './Block'

class App extends Component {
  constructor () {
    super()

    this.state = {
      blocks: [
        {
          x: 0,
          y: 1,
        },
        {
          x: 0,
          y: 0,
        },
        {
          x: -1,
          y: 0,
        },
        {
          x: -2,
          y: 0,
        },
        {
          x: -3,
          y: 0,
        },
        {
          x: -3,
          y: -1,
        },
        {
          x: 0,
          y: -1,
        },
      ]
    }
  }

  addBlock = (nextCoordinates) => {
    const prevBlocks = this.state.blocks

    this.setState({
      blocks: [
        ...prevBlocks,
        nextCoordinates,
      ]
    })
  }

  render() {
    const {
      blocks
    } = this.state

    return (
      <div className="App">
        {
          blocks.map((block, idx) =>
            <Block coordinates={block} key={idx} handler={this.addBlock} />
          )
        }
      </div>
    )
  }
}

export default App

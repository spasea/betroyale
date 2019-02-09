import React, { Component } from 'react'

class Block extends Component {
  isPositive = number => {
    return number / -1 <= 0
  }

  subtractNumber = (coordinate, number) => {
    return coordinate - number
  }

  addNumber = (coordinate, number) => {
    return coordinate + number
  }

  render() {
    const width = 100
    const height = 100
    const {
      coordinates,
      handler,
    } = this.props

    const {
      x,
      y
    } = coordinates

    const marginLeft = width * x
    const marginTop = height * y

    return (
      <div className="block" style={{
        marginLeft,
        marginTop
      }}>
        <div className="block__side block__side--is-top"
          onClick={() => handler({ x, y: this.subtractNumber(y,1) })}
        />
        <div className="block__side block__side--is-left"
          onClick={() => handler({ x: this.subtractNumber(x,1), y })}
        />
        <div className="block__side block__side--is-right"
          onClick={() => handler({ x: this.addNumber(x, 1), y })}
        />
        <div className="block__side block__side--is-bottom"
          onClick={() => handler({ x, y: this.addNumber(y, 1) })}
        />

        {
          JSON.stringify(coordinates)
        }
      </div>
    )
  }
}

export default Block

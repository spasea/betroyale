import React from 'react'

const Room = ({ coordinates, exits, exitsAmount, margins, getExit, addRoom, image }) => {
  return <div className="block" style={{
    ...margins,
    background: `url(${image})`
  }}>
    <span>amount: {exitsAmount}<br/>
    camount: {exits.length}
    </span>
    {
      exits && exits.map(exit =>
        <div className={`block__side ${getExit(exit).className}`}
             key={`${exit.x}:${exit.y}`}
             onClick={() => addRoom(exit, coordinates)}
        />
      )
    }
  </div>
}

export default Room

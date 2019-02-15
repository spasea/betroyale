import React from 'react'

const Room = ({ coordinates, exits, margins, getExit, addRoom, image }) => {
  return <div className="block" style={{
    ...margins,
    background: `url(${image})`
  }}>
    {
      exits && exits.map(exit =>
        <div className={`block__side ${getExit(exit).className}`}
             key={exit.id}
             onClick={() => addRoom(exit, coordinates)}
        />
      )
    }
  </div>
}

export default Room

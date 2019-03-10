class Room {
  mainExit = {
    x: 0,
    y: 0
  }
  positions = {
    right: 'right',
    left: 'left',
    bottom: 'bottom',
    top: 'top',
  }
  availableExits = [
    {
      position: this.positions.right,
      x: 1,
      y: 0,
    },
    {
      position: this.positions.left,
      x: -1,
      y: 0,
    },
    {
      position: this.positions.bottom,
      x: 0,
      y: 1,
    },
    {
      position: this.positions.top,
      x: 0,
      y: -1,
    },
  ]

  constructor ({ id, exitsAmount, coordinates }) {
    this.id = id
    this.exitsAmount = exitsAmount - 1
    this.coordinates = coordinates
  }

  get nearbyRooms () {
    const satisfyingCoordinates = {
      x: [
        this.coordinates.x + 1,
        this.coordinates.x,
        this.coordinates.x - 1,
      ],
      y: [
        this.coordinates.y + 1,
        this.coordinates.y,
        this.coordinates.y - 1,
      ]
    }

    const filteredRooms = this.roomsList.filter(roomCoordinates =>
      satisfyingCoordinates.x.includes(roomCoordinates.x) && satisfyingCoordinates.y.includes(roomCoordinates.y)
    )

    const compareCoordinates = (coordinates, roomCoordinates) =>
      coordinates.x === roomCoordinates.x && coordinates.y === roomCoordinates.y

    const top = !!filteredRooms.find(room => compareCoordinates({ x: this.coordinates.x, y: this.coordinates.y - 1 }, room))
    const bottom = !!filteredRooms.find(room => compareCoordinates({ x: this.coordinates.x, y: this.coordinates.y + 1 }, room))
    const left = !!filteredRooms.find(room => compareCoordinates({ x: this.coordinates.x - 1, y: this.coordinates.y }, room))
    const right = !!filteredRooms.find(room => compareCoordinates({ x: this.coordinates.x + 1, y: this.coordinates.y }, room))

    return {
      bottom,
      top,
      left,
      right,
    }
  }

  set mainEntry (exit) {
    this.mainExit = {...exit}
  }

  get mainEntry () {
    return {
      x: this.mainExit.x * -1,
      y: this.mainExit.y * -1,
    }
  }

  get exitsWoEntry () {
    return this.availableExits.filter(exit =>
      exit.x !== this.mainEntry.x || exit.y !== this.mainEntry.y
    )
  }

  setRoomsList (list) {
    this.roomsList = list
  }

  setRandomService (RandomService) {
    this.RandomService = RandomService
  }

  generateExits () {
    const freeExits = this.exitsWoEntry.filter(exit =>
      !this.nearbyRooms[exit.position]
    ).sort(this.RandomService.boolean)

    const lockedExits = this.exitsWoEntry.filter(exit =>
      this.nearbyRooms[exit.position]
    ).sort(this.RandomService.boolean)

    const resultingExits = [
      ...freeExits,
      ...lockedExits
    ]

    return [
      this.mainEntry,
      ...resultingExits.slice(0, this.exitsAmount)
    ]
  }
}

export default Room

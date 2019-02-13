const faker = require('faker')
faker.locale = 'en'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const block = {
  width: 100,
  height: 100,
}
const locations = {
  amount: 2,
}

const rooms = {
  amount: 10,
}

const events = {
  amount: 20,
  types: {
    OMEN: 'OMEN',
    ITEM: 'ITEM',
    EVENT: 'EVENT',
  }
}

const generateExits = (amount, list) => {
  const listCopy = [
    ...list
  ]

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    ...listCopy.splice(random(0, listCopy.length - 1), 1)[0]
  }))
}

const initLocations = amount => {
  const positionTypes = {
    TOP: 'TOP',
    MIDDLE: 'MIDDLE',
    BOTTOM: 'BOTTOM',
  }

  const exits = [
    {
      x: 1,
      y: 0,
      position: positionTypes.TOP,
    },
    {
      x: 1,
      y: 0,
      position: positionTypes.MIDDLE,
    },
    {
      x: 1,
      y: 0,
      position: positionTypes.BOTTOM,
    },

    {
      x: -1,
      y: 0,
      position: positionTypes.TOP,
    },
    {
      x: -1,
      y: 0,
      position: positionTypes.MIDDLE,
    },
    {
      x: -1,
      y: 0,
      position: positionTypes.BOTTOM,
    },

    {
      x: 0,
      y: 1,
      position: positionTypes.BOTTOM,
    },
    {
      x: 0,
      y: -1,
      position: positionTypes.TOP,
    },
  ]

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    title: faker.lorem.words(2),
    image: faker.image.abstract(block.width, block.height),
    exits: generateExits(random(3, 7), exits)
  }))
}

const initEvents = amount => {
  const eventsTypes = Object.values(events.types)

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    title: faker.lorem.words(random(1, 3)),
    description: faker.lorem.words(random(8, 13)),
    type: eventsTypes[random(0, eventsTypes.length - 1)]
  }))
}

const eventsList = initEvents(events.amount)

const initRooms = amount => {
  const exits = [
    {
      x: 1,
      y: 0,
    },
    {
      x: -1,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: 0,
      y: -1,
    },
  ]

  const generateRelatedLocations = () => {
    const locationsIds = Array(locations.amount).fill(null).map((_, id) => id + 1)

    return Array(random(1, 2)).fill(null).map(() =>
      locationsIds.splice(random(0, locationsIds.length - 1), 1)[0]
    )
  }

  const generateEvents = () => {
    const items = {
      OMEN: eventsList.filter(event => event.type === events.types.OMEN),
      ITEM: eventsList.filter(event => event.type === events.types.ITEM),
      EVENT: eventsList.filter(event => event.type === events.types.EVENT),
    }
    const eventsTypes = Object.values(events.types)

    return Array(random(1, 2)).fill(null).map(() => {
      const type = eventsTypes[random(0, eventsTypes.length - 1)]

      return items[type].splice(random(0, items[type].length - 1), 1)[0].id
    })
  }

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    title: faker.lorem.words(2),
    image: faker.image.abstract(block.width, block.height),
    relatedLocations: generateRelatedLocations(),
    events: generateEvents(),
    exits: generateExits(random(1, 4), exits),
  }))
}

module.exports = () => {
  return {
    locations: initLocations(locations.amount),
    rooms: initRooms(rooms.amount),
    events: eventsList,
  }
}
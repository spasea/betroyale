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
  amount: 60,
}

const events = {
  amount: 120,
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
    title: faker.commerce.productName(),
    image: [
      'https://placeholdit.imgix.net/~text?txt=Location%20Room1&w=' + block.width + '&h=' + block.height + '&txtsize=20',
      'https://placeholdit.imgix.net/~text?txt=Location%20Room2&w=' + block.width + '&h=' + block.height + '&txtsize=20',
      'https://placeholdit.imgix.net/~text?txt=Location%20Room3&w=' + block.width + '&h=' + block.height + '&txtsize=20',
    ],
    exits: generateExits(random(3, 7), exits)
  }))
}

const initEvents = amount => {
  const eventsTypes = Object.values(events.types)

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    title: faker.hacker.verb(),
    description: faker.hacker.phrase(),
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
    image: 'https://placeholdit.imgix.net/~text?txt=Room%20' + (id + 1) + '&w=' + block.width + '&h=' + block.height + '&txtsize=20',
    relatedLocations: generateRelatedLocations(),
    events: generateEvents(),
    exitsAmount: random(1, 4),
    // exits: generateExits(random(1, 4), exits),
  }))
}

module.exports = () => {
  return {
    locations: initLocations(locations.amount),
    rooms: initRooms(rooms.amount),
    events: eventsList,
  }
}
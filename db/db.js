const faker = require('faker')
faker.locale = 'en'

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const generateExits = (amount, list) => {
  const listCopy = [
    ...list
  ]

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    ...listCopy[random(0, listCopy.length - 1)]
  }))
}

const initLocations = amount => {
  const exits = [
    {
      x: 1,
      y: 0,
    },
    {
      x: 1,
      y: -2,
    },
    {
      x: 0,
      y: -3,
    },
    {
      x: -1,
      y: -2,
    },
    {
      x: -1,
      y: 0,
    },
    {
      x: -1,
      y: -2,
    },
    {
      x: 0,
      y: 3,
    },
    {
      x: 1,
      y: 2,
    },
  ]

  return Array(amount).fill(null).map((_, id) => ({
    id: id + 1,
    title: faker.lorem.words(2),
    image: faker.image.abstract(100, 100),
    exits: generateExits(random(3, 7), exits)
  }))
}

module.exports = () => {
  return {
    locations: initLocations(5),
    rooms: [],
    events: []
  }
}
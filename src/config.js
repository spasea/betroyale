export default {
  production: {
    baseURL: '',
  },
  development: {
    baseURL: 'http://localhost:4000',
    locations: {
      get: {
        url: '/Locations'
      }
    },
    rooms: {
      get: {
        url: '/rooms'
      }
    },
    events: {
      get: {
        url: '/events'
      }
    },
  },
}

export const locations = 'locations'
export const rooms = 'rooms'
export const events = 'events'

export const locationExists = {
  TOP: 'TOP',
  MIDDLE: 'MIDDLE',
  BOTTOM: 'BOTTOM',
}

export default {
  production: {
    baseURL: '',
  },
  development: {
    baseURL: 'http://localhost:4000',
    [locations]: {
      get: {
        url: '/locations'
      },
      post: {
        url: '/locations'
      },
      put: {
        url: '/locations/__ID__'
      },
      delete: {
        url: '/locations/__ID__'
      }
    },
    [rooms]: {
      get: {
        url: '/rooms'
      }
    },
    [events]: {
      get: {
        url: '/events'
      }
    },
  },
}

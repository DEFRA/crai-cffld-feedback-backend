import { postQueryHandler } from '~/src/api/query/controllers/query-controller'

const query = {
  plugin: {
    name: 'query',
    register: async (server) => {
      server.route([
        {
          method: 'POST',
          path: '/feedback/query',
          options: {
            payload: {
              parse: false
            }
          },
          ...postQueryHandler
        }
      ])
    }
  }
}

export { query }

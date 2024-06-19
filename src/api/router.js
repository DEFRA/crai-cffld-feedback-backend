import { health } from '~/src/api/health'
import { query } from '~/src/api/query'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([health])

      await server.register([query])
    }
  }
}

export { router }

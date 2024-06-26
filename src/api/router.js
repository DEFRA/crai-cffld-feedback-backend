import { health } from '~/src/api/health'
import { query } from '~/src/api/query'
import { metadata } from '~/src/api/metadata'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([health])

      await server.register([query])

      await server.register([metadata])
    }
  }
}

export { router }

import { ComprehendClient } from '@aws-sdk/client-comprehend'
import { config } from '~/src/config/index.js'

const comprehend = {
  plugin: {
    name: 'comprehend',
    version: '1.0.0',
    register: async function (server, options) {
      server.logger.info('Creating comprehend client')

      const client = new ComprehendClient({
        region: config.get('aws.region')
      })

      server.decorate('server', 'comprehend', client)
      server.decorate('request', 'comprehend', client)

      server.logger.info('Comprehend client created')
    }
  }
}

export { comprehend }

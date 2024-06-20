import { getFeedbackHandler } from './controllers/feedback-controller'

const metadata = {
  plugin: {
    name: 'metadata',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/feedback/metadata',
          ...getFeedbackHandler
        }
      ])
    }
  }
}

export { metadata }

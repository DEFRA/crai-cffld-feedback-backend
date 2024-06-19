import { getFeedbackHandler } from './controllers/feedback-controller'

const feedback = {
  plugin: {
    name: 'feedback',
    register: async (server) => {
      server.route([
        {
          method: 'POST',
          path: '/feedback/uploads',
          ...getFeedbackHandler
        }
      ])
    }
  }
}

export { feedback }

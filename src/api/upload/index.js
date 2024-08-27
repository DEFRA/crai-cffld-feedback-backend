import { uploadFeedbackHandler } from './controllers/upload-controller'

const upload = {
  plugin: {
    name: 'upload',
    register: async (server) => {
      server.route([
        {
          method: 'POST',
          path: '/feedback/upload',
          ...uploadFeedbackHandler,
          options: {
            payload: {
              parse: true,
              maxBytes: 50 * 1024 * 1024,
              allow:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              multipart: false,
              output: 'stream'
            }
          }
        }
      ])
    }
  }
}

export { upload }

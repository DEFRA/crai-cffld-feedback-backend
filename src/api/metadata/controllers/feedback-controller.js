import { getAllMetadata } from '~/src/repos/metadata'

const getFeedbackHandler = {
  handler: async (request, h) => {
    const feedback = await getAllMetadata()
    return h.response(feedback).code(200)
  }
}

export { getFeedbackHandler }

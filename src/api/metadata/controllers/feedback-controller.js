import { listUploadMetadata } from '~/src/repos/upload-metadata'

const getFeedbackHandler = {
  handler: async (request, h) => {
    const feedback = await listUploadMetadata(request.db)

    return h.response(feedback).code(200)
  }
}

export { getFeedbackHandler }

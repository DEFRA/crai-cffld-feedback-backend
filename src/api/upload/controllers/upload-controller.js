import { processPayloadFile } from '~/src/lib/process-payload-file'
import { addUploadMetadata } from '~/src/repos/upload-metadata'
import { parseFeedbackFile } from '~/src/services/feedback-parser/index'
import { triageFeedback } from '~/src/services/triage/index'

const uploadFeedbackHandler = {
  handler: async (request, h) => {
    const buffer = await processPayloadFile(request.payload)

    const { db, comprehend } = request

    const { id } = await addUploadMetadata(db, { status: 'RECEIVED' })

    const feedback = await parseFeedbackFile(db, comprehend, id, buffer)

    await triageFeedback(db, id, feedback)

    return h.response().code(201)
  }
}

export { uploadFeedbackHandler }

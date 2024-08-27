import readXlsxFile from 'read-excel-file/node'
import schema from '~/src/services/feedback-parser/schema.js'
import { updateUploadMetadata } from '~/src/repos/upload-metadata'
import { redactPiiRows } from '~/src/lib/comprehend'

const parseFeedbackFile = async (db, comprehend, id, buffer) => {
  try {
    await updateUploadMetadata(db, id, { status: 'PROCESSING' })

    const { rows, errors } = await readXlsxFile(buffer, { schema })

    if (errors.length) {
      console.error('Schema validation errors: ', errors)

      throw new Error('Schema validation failed')
    }

    const { redactedRows, totalRedacted } = await redactPiiRows(
      comprehend,
      rows
    )

    const metadata = {
      totalRedacted,
      totalFeedback: rows.length,
      status: 'UPLOADED'
    }

    await updateUploadMetadata(db, id, metadata)

    return redactedRows
  } catch (err) {
    console.error('Error processing feedback: ', err)

    await updateUploadMetadata(db, id, { status: 'FAILED' })

    throw err
  }
}

export { parseFeedbackFile }

const collectionName = 'upload-metadata'

async function addUploadMetadata(db, metadata) {
  const collection = db.collection(collectionName)

  const inserted = await collection.insertOne(metadata)

  return {
    id: inserted.insertedId,
    metadata
  }
}

async function updateUploadMetadata(db, id, metadata) {
  const collection = db.collection(collectionName)

  const update = {
    status: metadata.status
  }

  if (metadata.totalRedacted) {
    update.total_redacted = metadata.totalRedacted
  }

  if (metadata.totalFeedback) {
    update.total_feedback = metadata.totalFeedback
  }

  const updated = await collection.updateOne(
    { _id: id },
    { $set: update }
  )

  return updated
}

async function listUploadMetadata(db) {
  const collection = db.collection(collectionName)

  const metadata = await collection.find().toArray()

  return metadata.map((upload) => ({
    id: upload._id,
    status: upload.status,
    totalRedacted: upload.total_redacted,
    totalFeedback: upload.total_feedback
  }))
}

export { addUploadMetadata, updateUploadMetadata, listUploadMetadata }

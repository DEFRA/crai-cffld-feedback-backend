const collectionName = 'feedback'

async function addFeedback(db, feedback) {
  const collection = db.collection(collectionName)

  const inserted = collection.insertOne(feedback)

  return inserted.insertedId
}

export {
  addFeedback
}

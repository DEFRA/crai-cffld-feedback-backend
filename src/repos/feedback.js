const collectionName = 'feedback'

async function addFeedback(db, feedback) {
  const collection = db.collection(collectionName)

  const inserted = collection.insertOne(feedback)

  return inserted.insertedId
}

async function getFeedback(db, args) {
  const collection = db.collection(collectionName)

  const query = {}

  if (args.from_date) {
    query.date_time = { $gte: new Date(args.from_date) }
  }

  if (args.to_date) {
    query.date_time = { ...query.date_time, $lte: new Date(args.to_date) }
  }

  if (args.categories) {
    query.categories = { $in: args.categories }
  }

  if (args.sub_categories) {
    query.sub_categories = { $in: args.sub_categories }
  }

  if (args.rating_summary) {
    query.rating_summary = { $in: args.rating_summary }
  }

  if (args.urgent) {
    query.urgent = args.urgent
  }

  const feedback = await collection.find(query).toArray()

  return feedback
}

export { addFeedback, getFeedback }

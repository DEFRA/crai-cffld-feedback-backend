import { knex } from '~/src/config/db'

const getFeedback = async (args) => {
  try {
    const feedback = knex('feedback').select('*')

    if (args.from_date) {
      feedback.where('date_time', '>=', args.from_date)
    }

    if (args.to_date) {
      feedback.where('date_time', '<=', args.to_date)
    }

    if (args.categories) {
      feedback.whereIn('category', args.categories)
    }

    if (args.sub_categories) {
      feedback.whereIn('sub_category', args.sub_categories)
    }

    if (args.rating_summary) {
      feedback.whereIn('rating_summary', args.rating_summary)
    }

    if (args.urgent) {
      feedback.where('urgent', args.urgent)
    }

    if (args.embeddings) {
      feedback.whereRaw(`(1 - (embedding <=> '[${args.embeddings}]')) > 0.4`)
      feedback.orderByRaw(`(1 - (embedding <=> '[${args.embeddings}]')) DESC`)
    }

    const res = await feedback

    return res
  } catch (err) {
    console.error(`Error getting feedback from db: ${err}`)
    throw err
  }
}

export { getFeedback }

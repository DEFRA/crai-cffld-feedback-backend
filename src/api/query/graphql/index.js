import { graphql } from 'graphql'

import schema from '~/src/api/query/graphql/schema'
import { getFeedback } from '~/src/repos/feedback'

const rootValue = {
  async feedback(args, context) {
    const feedback = await getFeedback(context.db, args)

    return feedback.map((f) => ({
      ...f,
      date_time: new Date(f.date_time).toISOString()
    }))
  }
}

const query = async (db, body) => {
  try {
    const res = await graphql({
      schema,
      source: body,
      rootValue,
      contextValue: {
        db
      }
    })

    return res
  } catch (err) {
    console.error(`Error querying feedback: ${err}`)
    throw err
  }
}

export { query }

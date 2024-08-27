import { graphql } from 'graphql'

import schema from './schema'

const rootValue = {
  feedback: async (_args) => {
    const feedback = [] // await getFeedback(args)

    return feedback.map((f) => ({
      ...f,
      date_time: new Date(f.date_time).toISOString()
    }))
  }
}

const query = async (body) => {
  try {
    const res = await graphql({
      schema,
      source: body,
      rootValue
    })

    return res
  } catch (err) {
    console.error(`Error querying feedback: ${err}`)
    throw err
  }
}

export { query }

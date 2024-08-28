import { query } from '~/src/api/query/graphql'

const postQueryHandler = {
  handler: async (request, h) => {
    const data = request.payload.toString()

    const { data: feedback } = await query(request.db, data)

    return h.response(feedback).code(200)
  }
}

export { postQueryHandler }

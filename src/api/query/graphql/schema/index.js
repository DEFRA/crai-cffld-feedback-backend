import { buildSchema } from 'graphql'

import feedback from '~/src/api/query/graphql/schema/feedback'
import query from '~/src/api/query/graphql/schema/query'

const schema = buildSchema(`
  ${feedback}

  ${query}
`)

export default schema

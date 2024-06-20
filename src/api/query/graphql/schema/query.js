const schema = `
  type Query {
    feedback(from_date: String, to_date: String, search: String, categories: [String], sub_categories: [String], rating_summary: [String], urgent: Boolean): [Feedback]
  }
`

export default schema

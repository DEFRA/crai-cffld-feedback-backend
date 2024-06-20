const schema = `
  type Feedback {
    id: Int!
    urgent: Boolean
    date_time: String
    duration: Int
    key_points: [String]
    operating_system: String
    screen_size: String
    rating: String
    is_flood_risk_area: String
    is_station_issue: String
    rating_summary: String
    comments: String
    category: String
    sub_category: String
    llm_comments: String
    originating_service: String
    qualtrics_id: String
  }
`

export default schema

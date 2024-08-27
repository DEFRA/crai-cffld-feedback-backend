import Joi from 'joi'

const categories = [
  'Data',
  'Bug',
  'Feature',
  'Incident',
  'Usability',
  'Spam',
  'Other'
]

const subCategories = [
  'Content',
  'Errors: spelling, dates, info',
  'Findability',
  'Forecasts/levels not provided',
  'Outdated Data',
  'Infrequent updates',
  'Map',
  'Other',
  'Personalisation',
  'Warning message'
]

const schema = Joi.object({
  category: Joi.string()
    .valid(...categories)
    .required(),
  sub_category: Joi.string()
    .valid(...subCategories)
    .required(),
  llm_comments: Joi.string().required(),
  originating_service: Joi.string()
    .valid('Check for flooding', 'Unknown')
    .required(),
  triaged_service: Joi.string()
    .valid('Check for flooding', 'Unknown')
    .required(),
  rating_summary: Joi.string()
    .valid('Positive', 'Negative', 'No Opinion')
    .required(),
  key_points: Joi.array().items(Joi.string()).min(1).max(5).unique().required(),
  urgent: Joi.boolean().required()
})

export default schema

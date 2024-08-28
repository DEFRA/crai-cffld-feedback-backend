import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
// import { camelCase } from 'change-case'

import * as bedrock from '~/src/helpers/bedrock'
import { addFeedback } from '~/src/repos/feedback'
import { updateUploadMetadata } from '~/src/repos/upload-metadata'
import schema from '~/src/services/triage/schema'

const prompt = `
<persona>
You are an expert in triaging feedback for a flooding web service.
</persona>

<instructions>
Your task is to triage a JSON object containing user feedback.

You should only respond with a valid JSON object that matches the JSON schema described in <response_schema>.
Any text you generate should be short and concise.
</instructions>

<feedback_object>
<schema>
{{
  "type": "object",
  "properties": {{
    "qualtrics_id": {{
      "type": "string"
    }},
    "source": {{
      "type": "string",
      "format": "uri"
    }},
    "date_time": {{
      "type": "string",
      "format": "date-time"
    }},
    "browser": {{
      "type": "string"
    }},
    "version": {{
      "type": "string"
    }},
    "operating_system": {{
      "type": "string"
    }},
    "screen_size": {{
      "type": "string"
    }},
    "rating": {{
      "type": "string",
      "enum": ["satisfied", "unsatisfied", "neutral"]
    }},
    "is_flood_risk_area": {{
      "type": "string",
      "enum": ["Yes", "No"]
    }},
    "is_station_issue": {{
      "type": "string",
      "enum": ["Yes", "No"]
    }},
    "duration": {{
      "type": "integer",
      "minimum": 0
    }},
    "comments": {{
      "type": "string"
    }}
  }},
  "required": ["qualtrics_id", "source", "date_time", "browser", "version", "operating_system", "screen_size", "rating", "is_flood_risk_area", "is_station_issue", "duration", "comments"]
}}
</schema>
{feedback}
</feedback_object>

<response_schema>
{{
  "type": "object",
  "properties": {{
    "category": {{
      "type": "string",
      "description": "Category assigned by you to the feedback based only on the comment text.",
      "enum": ["Data", "Bug", "Feature", "Incident", "Usability", "Spam", "Other"]
    }},
    "sub_category": {{
      "type": "string",
      "description": "Subcategory assigned by you to the feedback based only on the comment text.",
      "enum": ["Content", "Errors: spelling, dates, info", "Findability", "Forecasts/levels not provided", "Outdated Data", "Infrequent updates", "Map", "Other", "Personalisation", "Warning message"]
    }},
    "llm_comments": {{
      "type": "string",
      "description": "Summary of the feedback and, if applicable, recommended actions."
    }},
    "originating_service": {{
      "type": "string",
      "description": "Indicates which service the user was on when leaving the feedback",
      "enum": ["Check for flooding", "Unknown"]
    }},
    "triaged_service": {{
      "type": "string",
      "description": "Indicates which service you have triaged the feedback to (can be the same as originating_service)",
      "enum": ["Check for flooding", "Unknown"]
    }},
    "rating_summary": {{
      "type": "string",
      "description": "Summary rating determined from 'Rating' into  Positive,  Negative or No Opinion",
      "enum": ["Positive", "Negative", "No Opinion"]
    }},
    "key_points": {{
      "type": "array",
      "description": "Key points made in the comment.",
      "items": {{
        "type": "string"
      }},
      "minItems": 1,
      "maxItems": 5,
      "uniqueItems": true
    }},
    "urgent": {{
      "type": "boolean",
      "description": "Whether or not the comment should be addressed urgently, e.g. if there is someone in immediate danger or a tree blocking the road."
    }}
  }},
  "required": ["category", "sub_category", "llm_comments", "originating_service", "triaged_service", "rating_summary", "key_points", "urgent"]
}}
</response_schema>

{{
`

async function processFeedbackRow(row) {
  const chain = ChatPromptTemplate.fromTemplate(prompt)
    .pipe(bedrock.haiku)
    .pipe(new JsonOutputParser())

  const res = await chain.invoke({ feedback: JSON.stringify(row) })

  const { error } = await schema.validateAsync(res)

  if (error) {
    const err = new Error('Incorrect LLM JSON response')

    err.type = 'JSON_PARSE_ERROR'

    throw err
  }

  const triaged = {
    ...row,
    ...res
  }

  return triaged
}

async function triageFeedback(db, id, feedback) {
  const triaged = []
  const errors = []

  await updateUploadMetadata(db, id, { status: 'TRIAGING' })

  for (const row of feedback) {
    try {
      const processed = await processFeedbackRow(row)

      const id = await addFeedback(db, processed)

      triaged.push({ id, processed })
    } catch (err) {
      console.error('Error processing feedback: ', err)

      if (err.type !== 'JSON_PARSE_ERROR') {
        await updateUploadMetadata(db, id, { status: 'FAILED' })

        throw err
      }

      errors.push({ row, err })
    }
  }

  const status = errors.length > 0 ? 'WARNING' : 'TRIAGED'
  await updateUploadMetadata(db, id, { status })

  return triaged
}

export { triageFeedback }

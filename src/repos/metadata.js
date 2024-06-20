import { QueryCommand } from '@aws-sdk/client-dynamodb'
import { dynamodb } from '~/src/helpers/dynamodb'

function formatMetadata(item) {
  return {
    id: item.FeedbackId?.S,
    totalRedacted: item.TotalRedacted?.N,
    totalFeedback: item.TotalFeedback?.N,
    status: item.Status?.S
  }
}

async function getAllMetadata() {
  const params = new QueryCommand({
    TableName: 'cffld-feedback-metadata',
    ExpressionAttributeValues: {
      ':service': { S: 'cffld' }
    },
    KeyConditionExpression: 'Service = :service',
    SELECT: 'ALL_ATTRIBUTES'
  })

  try {
    const { Items: items } = await dynamodb.send(params)

    return items.map(formatMetadata)
  } catch (err) {
    console.error(err)

    throw err
  }
}

export { getAllMetadata }

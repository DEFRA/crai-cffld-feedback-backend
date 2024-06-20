import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

import { config } from '../config'

const dynamodb = new DynamoDBClient({
  region: config.get('aws.region')
})

export { dynamodb }

import { BedrockChat } from '@langchain/community/chat_models/bedrock'
const { BedrockEmbeddings } = require('@langchain/community/embeddings/bedrock')

import { config } from '~/src/config'

const haiku = new BedrockChat({
  model: 'anthropic.claude-3-haiku-20240307-v1:0',
  region: config.get('aws.region')
})

const sonnet = new BedrockChat({
  model: 'anthropic.claude-3-sonnet-20240229-v1:0',
  region: config.get('aws.region')
})

const embeddings = new BedrockEmbeddings({
  model: 'amazon.titan-embed-text-v1',
  region: config.get('aws.region')
})

export { haiku, sonnet, embeddings }

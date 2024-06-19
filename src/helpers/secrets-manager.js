import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"
import { config } from "../config"

const secretsManager = new SecretsManagerClient({
  region: config.get('aws.region')
})

const getSecret = async (secretId, json = false) => {
  const params = new GetSecretValueCommand({
    SecretId: secretId
  })

  try {
    const { SecretString } = await secretsManager.send(params)

    if (!SecretString) {
      throw new Error('Secret not found')
    }

    if (json) {
      return JSON.parse(SecretString)
    }

    return SecretString
  } catch (err) {
    console.error(err)

    throw err
  }
}

export { secretsManager, getSecret }

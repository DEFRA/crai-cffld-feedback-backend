import knex from 'knex'
import { getSecret } from '~/src/helpers/secrets-manager'
import { config } from '~/src/config'

const getConfig = async () => {
  const secret = await getSecret('cffld-feedback-pg', true)

  const dbConfig = {
    host: secret.host,
    port: config.get('pg.port'),
    user: secret.username,
    password: secret.password,
    database: config.get('pg.database')
  }

  return dbConfig
}

const connection = knex({
  client: 'pg',
  connection: getConfig
})

export {
  connection as knex,
  getConfig
}

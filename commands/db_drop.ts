import pg from 'pgtools'
const { dropdb } = pg
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import Env from '#start/env'

const config = {
  user: Env.get('DB_USER'),
  password: Env.get('DB_PASSWORD'),
  port: Env.get('DB_PORT'),
  host: Env.get('DB_HOST'),
}

const destroyDb = async () => {
  try {
    await dropdb(config, Env.get('DB_DATABASE'))
    return 'Database deleted'
  } catch (e) {
    return e
  }
}

export default class DbDrop extends BaseCommand {
  static commandName = 'db:drop'
  static description = 'Drop database'

  static options: CommandOptions = {
    loadApp: true,
    staysAlive: true,
  }

  async run() {
    try {
      const response = await destroyDb()
      this.logger.info(response)
    } catch (err) {
      this.logger.error(err)
    }
  }
}

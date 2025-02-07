import pg from 'pgtools'
const { createdb } = pg
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import Env from '#start/env'

const config = {
  user: Env.get('DB_USER'),
  password: Env.get('DB_PASSWORD'),
  port: Env.get('DB_PORT'),
  host: Env.get('DB_HOST'),
}

const createDb = async () => {
  try {
    await createdb(config, Env.get('DB_DATABASE'))
    return 'Database created'
  } catch (e) {
    return e
  }
}

export default class DbCreate extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  static commandName = 'db:create'
  /**
   * Command description is displayed in the "help" output
   */
  static description = 'Create database'

  static options: CommandOptions = {
    loadApp: true,
    staysAlive: true,
  }

  async run() {
    try {
      const response = await createDb()
      this.logger.info(response)
    } catch (err) {
      this.logger.error(err)
    }
  }
}

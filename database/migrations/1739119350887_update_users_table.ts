import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enu('account_status', ['PENDING', 'ACTIVE', 'DELETED'], {
        useNative: true,
        enumName: 'user_account_status',
        existingType: false,
      })
      table.boolean('soft_delete').defaultTo(false)

      table.timestamp('softDeleteDate')
    })
  }
}

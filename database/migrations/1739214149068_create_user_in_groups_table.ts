import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_in_groups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enu('user_rights', ['R', 'R/W', 'ALL'], {
        useNative: true,
        enumName: 'user_rights_in_group',
        existingType: false,
      })
      table.integer('user_id').unsigned().references('users.id')
      table.integer('group_id').unsigned().references('groups.id')
      table.unique(['user_id', 'group_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

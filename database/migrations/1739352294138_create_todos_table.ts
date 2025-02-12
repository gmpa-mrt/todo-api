import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('todo_title', 100).notNullable()
      table.text('todo_content').nullable()
      table.enu('todo_status', ['ONGOING', 'DONE', 'ARCHIVED'], {
        useNative: true,
        enumName: 'todos_status',
        existingType: false,
      })
      // Relation
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('project_id').unsigned().references('projects.id').onDelete('CASCADE')

      // Date Time
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('archived_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

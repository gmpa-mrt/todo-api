import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('project_name', 100).notNullable()
      table.text('project_description').nullable()
      table.boolean('is_public').nullable().defaultTo(false)
      table.boolean('is_archived').nullable().defaultTo(false)
      // Relation
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('group_id').unsigned().references('groups.id').onDelete('CASCADE')

      // Add a CHECK constraint to enforce that a project
      // belongs either to a user OR a group, but not both
      table.check(
        '(user_id IS NOT NULL AND group_id IS NULL) OR (user_id IS NULL AND group_id IS NOT NULL)'
      )

      // Date time
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('archived_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

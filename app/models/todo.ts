import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { TodoStatus } from '../enums/todo_status.js'
import User from '#models/user'
import * as relations from '@adonisjs/lucid/types/relations'
import Project from '#models/project'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare todoTitle: string

  @column()
  declare todoContent: string

  @column()
  declare todoStatus: TodoStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare archivedAt: DateTime

  // Relation
  @belongsTo(() => User)
  declare creatorId: relations.BelongsTo<typeof User>

  @belongsTo(() => Project)
  declare projectId: relations.BelongsTo<typeof Project>
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import * as relations from '@adonisjs/lucid/types/relations'
import Group from '#models/group'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectName: string

  @column()
  declare projectDescription: string

  @column()
  declare isPublic: boolean

  @column()
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare archivedAt: DateTime

  // Relations
  @belongsTo(() => User)
  declare ownerUser: relations.BelongsTo<typeof User>

  @belongsTo(() => Group)
  declare ownerGroup: relations.BelongsTo<typeof Group>
}

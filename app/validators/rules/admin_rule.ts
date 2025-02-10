import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'
import { FieldContext } from '@vinejs/vine/types'

/**
 * Options accepted by the unique rule
 */
type Options = {
  table: string
  findBy: string
  checkBy: string
}

/**
 * Implementation
 */
async function admin_rule(value: unknown, options: Options, field: FieldContext) {
  if (value !== true) {
    return
  }
  const row = await db
    .query()
    .select(options.findBy)
    .from(options.table)
    .where(options.findBy, field.meta.userId)
    .andWhere(options.checkBy, true)
    .first()

  if (!row) {
    field.report('You have not got the correct access', 'not allowed', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const adminRule = vine.createRule(admin_rule)

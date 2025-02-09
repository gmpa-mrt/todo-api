import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'
import { FieldContext } from '@vinejs/vine/types'

/**
 * Options accepted by the unique rule
 */
type Options = {
  table: string
  column: string
  userID: number
}

/**
 * Implementation
 */
async function admin(_value: unknown, options: Options, field: FieldContext) {
  // Avoid to apply this rule if this field doesn't change
  if (field.value === undefined || field.value === null) {
    return
  }

  const row = await db
    .query()
    .select(options.column)
    .from(options.table)
    .where(options.column, options.userID)
    .where('is_admin', true)
    .first()

  if (row) {
    field.report('You have not got the correct access', 'not allowed', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const adminRule = vine.createRule(admin)

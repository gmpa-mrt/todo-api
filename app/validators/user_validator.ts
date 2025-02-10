import vine from '@vinejs/vine'
import { uniqueRule } from '#validators/rules/unique_rule'
import { adminRule } from '#validators/rules/admin_rule'
import { UserAccountStatus } from '../enums/user_account_status.js'

/**
 * Validator to validate the payload when creating
 * a new user.
 * Regex for password validation:
 * - At least 6 characters
 * - At least 1 uppercase letter (A-Z)
 * - At least 1 digit (0-9)
 * - At least 1 special character (!, @, #, etc.)
 */
export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(45),
    lastName: vine.string().trim().minLength(2).maxLength(45),
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/),
    avatar: vine.string().url().optional(),
    isAdmin: vine
      .boolean()
      .use(adminRule({ table: 'users', findBy: 'id', checkBy: 'is_admin' }))
      .optional(),
    statusAccount: vine.enum(UserAccountStatus).optional(),
    softDelete: vine.boolean().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing user.
 */
export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(2).maxLength(45).optional(),
    lastName: vine.string().trim().minLength(2).maxLength(45).optional(),
    email: vine
      .string()
      .email()
      .use(uniqueRule({ table: 'users', column: 'email' }))
      .optional(),
    password: vine
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
      .optional(),
    avatar: vine.string().url().optional(),
    isAdmin: vine
      .boolean()
      .use(adminRule({ table: 'users', findBy: 'id', checkBy: 'is_admin' }))
      .optional(),
    statusAccount: vine.enum(UserAccountStatus).optional(),
    softDelete: vine.boolean().optional(),
  })
)

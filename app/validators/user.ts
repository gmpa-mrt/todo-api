import vine from '@vinejs/vine'
import { uniqueRule } from '#validators/rules/unique'
import { adminRule } from '#validators/rules/admin'
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
export const createUserValidator = (userID: number) =>
  vine.compile(
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
        .optional()
        .use(adminRule({ table: 'users', column: 'is_admin', userID: userID })),
      statusAccount: vine.enum(UserAccountStatus),
      softDelete: vine.boolean().optional(),
    })
  )

/**
 * Validator to validate the payload when updating
 * an existing user.
 */
export const updateUserValidator = (userID: number) =>
  vine.compile(
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
        .optional()
        .use(adminRule({ table: 'users', column: 'is_admin', userID: userID })),
      statusAccount: vine.enum(UserAccountStatus),
      softDelete: vine.boolean().optional(),
    })
  )

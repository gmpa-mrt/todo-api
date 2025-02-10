import { test } from '@japa/runner'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'

test.group('User Validator:createUserValidator', () => {
  test('should pass to create an user', async ({ assert }) => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Test123!',
    }

    const result = await createUserValidator.validate(payload, {
      meta: {
        userId: 1,
      },
    })
    assert.isObject(result)
  })

  test('should pass to create an admin user', async ({ assert }) => {
    const validator = createUserValidator

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Test123!',
      isAdmin: true,
    }

    const result = await validator.validate(payload, {
      meta: {
        userId: 1,
      },
    })
    assert.isObject(result)
  })

  test("shouldn't pass to create an admin user", async ({ assert }) => {
    const validator = createUserValidator

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Test123!',
      isAdmin: true,
    }

    await assert.rejects(() => {
      return validator.validate(payload, {
        meta: {
          userId: 2, // This user isn't admin in the seed file
        },
      })
    }, 'Validation failure')
  })

  test('should pass to update as admin user', async ({ assert }) => {
    const validator = updateUserValidator

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Test123!',
      isAdmin: true,
    }
    const result = await validator.validate(payload, {
      meta: {
        userId: 1,
      },
    })
    assert.isObject(result)
  })

  test("shouldn't pass to update as admin user", async ({ assert }) => {
    const validator = updateUserValidator

    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Test123!',
      isAdmin: true,
    }

    await assert.rejects(() => {
      return validator.validate(payload, {
        meta: {
          userId: 2, // This user isn't admin in the seed file
        },
      })
    }, 'Validation failure')
  })
})

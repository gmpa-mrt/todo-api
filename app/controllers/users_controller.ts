import type { HttpContext } from '@adonisjs/core/http'
import UserRepository from '#repositories/user_repository'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private userRepository: UserRepository) {}

  async index() {
    return this.userRepository.getAll()
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await this.userRepository.findByIdOrFail(params.id)
      return response.ok(user)
    } catch {
      return response.notFound({
        message: 'not found',
      })
    }
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator, {
      meta: {
        userId: 1,
      },
    })
    try {
      const user = await this.userRepository.createUser(payload)
      return response.created(user)
    } catch (e) {
      return response.badRequest({ message: e })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const isPatch = request.method() === 'PATCH'

    const data = isPatch
      ? request.only([
          'lastName',
          'firstName',
          'email',
          'password',
          'avatar',
          'isAdmin',
          'statusAccount',
        ])
      : request.all()

    const payload = await updateUserValidator.validate(data, {
      meta: {
        userId: 1,
      },
    })

    try {
      const user = await this.userRepository.findByIdOrFail(params.id)

      try {
        await user.merge(payload).save()
        return response.ok(user)
      } catch (e) {
        return response.badRequest({ message: e })
      }
    } catch {
      return response.notFound({ message: 'not found' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await this.userRepository.findByIdOrFail(params.id)

      try {
        await user.delete()
        return response.ok({ message: 'done' })
      } catch (e) {
        return response.badRequest({ message: e })
      }
    } catch {
      return response.notFound({ message: 'not found' })
    }
  }
}

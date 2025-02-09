import type { HttpContext } from '@adonisjs/core/http'
import UserRepository from '#repositories/user_repository'
import { createUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  async index() {
    return UserRepository.all()
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await UserRepository.findByOrFail('id', params.id)
      return response.ok(user)
    } catch {
      return response.notFound({
        message: 'not found',
      })
    }
  }

  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator(1))
    try {
      const user = await UserRepository.create(payload)
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

    const payload = await updateUserValidator(1).validate(data)

    try {
      const user = await UserRepository.findByOrFail('id', params.id)

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
      const user = await UserRepository.findByOrFail('id', params.id)

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

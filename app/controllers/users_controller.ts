import type { HttpContext } from '@adonisjs/core/http'

import UserRepository from '#repositories/user_repository'

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
    const data = request.body()
    try {
      const user = await UserRepository.create(data)
      return response.created(user)
    } catch (e) {
      return response.badRequest({ message: e })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const isPatch = request.method() === 'PATCH'

    const data = isPatch
      ? request.only(['lastName', 'firstName', 'email', 'password', 'avatar'])
      : request.body()

    try {
      const user = await UserRepository.findByOrFail('id', params.id)

      try {
        await user.merge(data).save()
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

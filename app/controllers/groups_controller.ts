import type { HttpContext } from '@adonisjs/core/http'

import GroupRepository from '#repositories/group_repository'

export default class GroupsController {
  async index() {
    return GroupRepository.all()
  }

  async show({ params, response }: HttpContext) {
    try {
      const group = await GroupRepository.findByOrFail('id', params.id)
      return response.ok(group)
    } catch {
      return response.notFound('not found')
    }
  }

  async create({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const newGroup = await GroupRepository.create(data)
      return response.created(newGroup)
    } catch (e) {
      return response.badRequest(e)
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()

    try {
      const group = await GroupRepository.findOrFail('id', params.id)

      try {
        await group.merge(data).save()
        return response.ok(group)
      } catch (e) {
        return response.badRequest(e)
      }
    } catch {
      return response.notFound('not found')
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const group = await GroupRepository.findByOrFail('id', params.id)

      try {
        await group.delete()
        return response.ok({ message: 'done' })
      } catch (e) {
        return response.badRequest(e)
      }
    } catch (e) {
      return response.notFound('not found')
    }
  }
}

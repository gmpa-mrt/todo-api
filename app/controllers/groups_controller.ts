import type { HttpContext } from '@adonisjs/core/http'

import GroupRepository from '#repositories/group_repository'
import { inject } from '@adonisjs/core'

@inject()
export default class GroupsController {
  constructor(private groupRepository: GroupRepository) {}

  async index() {
    return this.groupRepository.getAll()
  }

  async show({ params, response }: HttpContext) {
    try {
      const group = await this.groupRepository.findByIdOrFail(params.id)
      return response.ok(group)
    } catch {
      return response.notFound('not found')
    }
  }

  async create({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const newGroup = await this.groupRepository.createGroup(data)
      return response.created(newGroup)
    } catch (e) {
      return response.badRequest(e)
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()

    try {
      const group = await this.groupRepository.findByIdOrFail(params.id)

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
      const group = await this.groupRepository.findByIdOrFail(params.id)

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

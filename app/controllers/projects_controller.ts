import { inject } from '@adonisjs/core'
import ProjectRepository from '#repositories/project_repository'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProjectsController {
  constructor(private projectRepository: ProjectRepository) {}

  async index() {
    return this.projectRepository.getAll()
  }

  async show({ params, response }: HttpContext) {
    try {
      const project = await this.projectRepository.findByIdOrFail(params.id)
      return response.ok(project)
    } catch {
      return response.notFound('not found')
    }
  }

  async create({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const newProject = await this.projectRepository.createGroup(data)
      return response.created(newProject)
    } catch (e) {
      return response.badRequest(e)
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    try {
      const project = await this.projectRepository.findByIdOrFail(params.id)

      try {
        await project.merge(data).save()
        return response.ok(project)
      } catch (e) {
        return response.badRequest(e)
      }
    } catch {
      return response.notFound('not found')
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const project = await this.projectRepository.findByIdOrFail(params.id)

      try {
        await project.delete()
        return response.ok({ message: 'done' })
      } catch (e) {
        return response.badRequest(e)
      }
    } catch {
      return response.notFound('not found')
    }
  }
}

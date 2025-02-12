import { inject } from '@adonisjs/core'
import TodoRepository from '#repositories/todo_repository'
import { HttpContext } from '@adonisjs/core/http'
import UserRepository from '#repositories/user_repository'
import ProjectRepository from '#repositories/project_repository'
import User from '#models/user'
import Project from '#models/project'

@inject()
export default class TodosController {
  constructor(
    private todoRepository: TodoRepository,
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository
  ) {}

  async getUserTodos({ params, response }: HttpContext) {
    try {
      const user = await this.userRepository.findByIdOrFail(params.id)

      return this.todoRepository.getAllUserTodo(user.id)
    } catch {
      return response.notFound('not found')
    }
  }

  async getProjectTodos({ params, response }: HttpContext) {
    try {
      const project = await this.projectRepository.findByIdOrFail(params.id)

      return this.todoRepository.getAllProjectTodo(project.id)
    } catch {
      return response.notFound('not found')
    }
  }

  async getUserTodosInProject({ params, response }: HttpContext) {
    let user: Partial<User> = {}
    let project: Partial<Project> = {}

    try {
      user = await this.userRepository.findByIdOrFail(params.userId)
    } catch {
      return response.notFound('not found')
    }

    try {
      project = await this.projectRepository.findByIdOrFail(params.projectId)
    } catch {
      return response.notFound('not found')
    }

    try {
      const todos = await this.todoRepository.getAllTodosUserInProject(user.id!, project.id!)
      return response.ok(todos)
    } catch (e) {
      return response.badRequest(e)
    }
  }

  async create({ request, response }: HttpContext) {
    const data = request.all()

    try {
      const newTodo = await this.todoRepository.createTodo(data)
      return response.created(newTodo)
    } catch (e) {
      return response.badRequest(e)
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()

    try {
      const todo = await this.todoRepository.getTodoById(params.id)

      try {
        const updatedTodo = await todo.merge(data).save()
        return response.ok(updatedTodo)
      } catch (e) {
        return response.badRequest(e)
      }
    } catch {
      return response.notFound('not found')
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const todo = await this.todoRepository.getTodoById(params.id)

      try {
        await todo.delete()
        return response.ok('done')
      } catch (e) {
        return response.badRequest(e)
      }
    } catch {
      return response.notFound('not found')
    }
  }
}

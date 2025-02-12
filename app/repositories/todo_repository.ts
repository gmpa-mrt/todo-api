import Todo from '#models/todo'
import db from '@adonisjs/lucid/services/db'

export default class TodoRepository {
  async getAllUserTodo(userId: number) {
    return Todo.findManyBy('user_id', userId)
  }

  async getAllProjectTodo(projectId: number) {
    return Todo.findManyBy('project_id', projectId)
  }

  async getAllTodosUserInProject(userId: number, projectId: number) {
    return db.query().from('todos').where('user_id', userId).where('project_id', projectId)
  }

  async getTodoById(idTodo: number) {
    return await Todo.findByOrFail('id', idTodo)
  }

  async createTodo(payload: Partial<Todo>) {
    return await Todo.create(payload)
  }
}

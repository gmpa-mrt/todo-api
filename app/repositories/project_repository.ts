import Project from '#models/project'
import Group from '#models/group'

export default class ProjectRepository {
  /**
   * @description Return an array of Projects. Can be empty
   */
  async getAll() {
    return Project.all()
  }

  /**
   * @description find a project by his id
   * @param id
   */
  async findByIdOrFail(id: number) {
    return await Project.findByOrFail('id', id)
  }

  /**
   * @description Create a new project
   * @param payload
   */
  async createGroup(payload: Partial<Group>) {
    return await Group.create(payload)
  }
}

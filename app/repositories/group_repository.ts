import Group from '#models/group'

export default class GroupRepository {
  /**
   * @description Return an array of Groups. Can be empty
   */
  async getAll(): Promise<Group[]> {
    return Group.all()
  }

  /**
   * @description find a group by his id
   * @param id
   */
  async findByIdOrFail(id: number) {
    return await Group.findByOrFail('id', id)
  }

  /**
   * @description Create a new group
   * @param payload
   */
  async createGroup(payload: Partial<Group>) {
    return await Group.create(payload)
  }
}

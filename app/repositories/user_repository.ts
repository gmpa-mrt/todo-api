import User from '#models/user'

export default class UserRepository {
  /**
   * @description Return an array of Users. Can be empty
   */
  async getAll(): Promise<User[]> {
    return User.all()
  }

  /**
   * @description Find a user by his id
   * @param id
   */
  async findByIdOrFail(id: number) {
    return await User.findByOrFail('id', id)
  }

  /**
   * @description Create a new User
   * @param payload
   */
  async createUser(payload: Partial<User>) {
    return await User.create(payload)
  }

  async verifyCredentials(email: string, password: string) {
    return await User.verifyCredentials(email, password)
  }

  async generateToken(user: User) {
    return await User.accessTokens.create(user)
  }

  async getToken(user: User) {
    return user.currentAccessToken
  }

  async destroyToken(user: User, token: string | number | BigInt) {
    return await User.accessTokens.delete(user, token)
  }
}

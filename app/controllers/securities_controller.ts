import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserRepository from '#repositories/user_repository'

@inject()
export default class SecuritiesController {
  constructor(private userRepository: UserRepository) {}

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await this.userRepository.verifyCredentials(email, password)

      try {
        const token = await this.userRepository.generateToken(user)

        return response.accepted({
          user,
          token,
        })
      } catch (e) {
        return response.badRequest(e)
      }
    } catch {
      return response.forbidden('invalid credentials')
    }
  }

  async register({ request, response }: HttpContext) {
    const data = request.all()
    try {
      const newUser = await this.userRepository.createUser(data)

      try {
        const token = await this.userRepository.generateToken(newUser)
        return response.created({
          newUser,
          token,
        })
      } catch (e) {
        return response.badRequest(e)
      }
    } catch (e) {
      return response.badRequest(e)
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await this.userRepository.destroyToken(user, token)
    return response.ok({ message: 'Logged out' })
  }
}

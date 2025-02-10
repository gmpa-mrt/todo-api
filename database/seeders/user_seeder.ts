import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  static environment = ['development', 'test']
  async run() {
    await User.createMany([
      {
        lastName: 'admin',
        firstName: 'admin',
        email: 'admin@admin.com',
        password: 'Password8!',
        isAdmin: true,
      },
      {
        lastName: 'user',
        firstName: 'user',
        email: 'user@user.com',
        password: 'Password8!',
        isAdmin: false,
      },
    ])
  }
}

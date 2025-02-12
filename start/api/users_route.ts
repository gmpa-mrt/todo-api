import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UserController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('me', [UserController, 'getCurrentUser'])
    router.get('user', [UserController, 'index'])
    router.get('user/:id', [UserController, 'show'])
    router.post('user', [UserController, 'create'])
    router.put('user/:id', [UserController, 'update'])
    router.patch('user/:id', [UserController, 'update'])
    router.delete('user/:id', [UserController, 'destroy'])
  })
  .prefix('/api')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

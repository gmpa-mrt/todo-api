import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SecurityController = () => import('#controllers/securities_controller')

router
  .group(() => {
    router.post('login', [SecurityController, 'login'])
    router.post('register', [SecurityController, 'register'])
    router.post('logout', [SecurityController, 'logout']).use(
      middleware.auth({
        guards: ['api'],
      })
    )
  })
  .prefix('/api')

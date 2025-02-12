import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const GroupController = () => import('#controllers/groups_controller')

router
  .group(() => {
    router.get('group', [GroupController, 'index'])
    router.get('group/:id', [GroupController, 'show'])
    router.post('group', [GroupController, 'create'])
    router.put('group/:id', [GroupController, 'update'])
    router.patch('group/:id', [GroupController, 'update'])
    router.delete('group/:id', [GroupController, 'destroy'])
  })
  .prefix('/api')
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )

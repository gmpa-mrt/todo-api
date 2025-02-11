import router from '@adonisjs/core/services/router'

const ProjectController = () => import('#controllers/projects_controller')

router
  .group(() => {
    router.get('project', [ProjectController, 'index'])
    router.get('project/:id', [ProjectController, 'show'])
    router.post('project', [ProjectController, 'create'])
    router.put('project/:id', [ProjectController, 'update'])
    router.patch('project/:id', [ProjectController, 'update'])
    router.delete('project/:id', [ProjectController, 'destroy'])
  })
  .prefix('/api')

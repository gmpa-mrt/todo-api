import router from '@adonisjs/core/services/router'

const TodoController = () => import('#controllers/todos_controller')

router
  .group(() => {
    router.get('todo/user/:id', [TodoController, 'getUserTodos'])
    router.get('todo/project/:id', [TodoController, 'getProjectTodos'])
    router.get('todo/project/:projectId/user/:userId', [TodoController, 'getUserTodosInProject'])
    router.post('todo', [TodoController, 'create'])
    router.put('todo/:id', [TodoController, 'update'])
    router.patch('todo/:id', [TodoController, 'update'])
    router.delete('todo/:id', [TodoController, 'destroy'])
  })
  .prefix('/api')

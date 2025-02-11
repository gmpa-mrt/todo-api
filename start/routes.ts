/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// API routes
import '#start/api/users_route'
import '#start/api/groups_route'
import '#start/api/projects_route'

// Test
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

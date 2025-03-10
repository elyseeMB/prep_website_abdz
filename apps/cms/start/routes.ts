/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import ArticlesController from '../app/articles/controllers/articles_controller.js'
import router from '@adonisjs/core/services/router'
const DashboardController = () => import('../app/dashboard/dashboard_controller.js')
const CollectionController = () => import('../app/collections/controller.js')

router.group(() => {
  router.get('/', [DashboardController]).as('dashboard')
  router.get('/articles', [ArticlesController, 'index']).as('articles.index')
  router.get('/articles/create', [ArticlesController, 'create']).as('articles.create')
  router.get('/collections', [CollectionController, 'index']).as('collections.index')
})

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
const AssetsController = () => import('../app/assets/controllers/assets_controller.js')
const DashboardController = () => import('../app/dashboard/dashboard_controller.js')
const CollectionController = () => import('../app/collections/controller.js')

router.group(() => {
  // ASSETS
  router.get('/assets', [AssetsController, 'show'])
  router.get('/assets/*', [AssetsController, 'show']).as('assets.show')
  router
    .post('/assets/:typeId?', [AssetsController, 'store'])
    .as('assets.store')
    .where('typeId', router.matchers.number())
  {
  }
  router.get('/', [DashboardController]).as('dashboard')
  router.get('/articles', [ArticlesController, 'index']).as('articles.index')
  router.get('/articles/create', [ArticlesController, 'create']).as('articles.create')
  router.post('/articles', [ArticlesController, 'store']).as('articles.store')
  router.get('/collections', [CollectionController, 'index']).as('collections.index')
})

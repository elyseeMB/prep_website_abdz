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

import { middleware } from './kernel.js'
const LogoutController = () => import('../app/auth/controllers/logout_controller.js')
const LoginController = () => import('../app/auth/controllers/login_controller.js')
const TaxonomiesController = () => import('../app/taxonomies/controller/taxonomie_controller.js')
const AssetsController = () => import('../app/assets/controllers/assets_controller.js')
const DashboardController = () => import('../app/dashboard/controller/dashboard_controller.js')
const CollectionController = () => import('../app/collections/controller.js')

// AUTH -> LOGIN, LOGOUT
router.get('/login', [LoginController, 'show']).as('auth.login.show').use(middleware.guest())
router.post('/login', [LoginController, 'store']).as('auth.login.store').use(middleware.guest())
router.post('/logout', [LogoutController, 'handle']).as('auth.logout').use(middleware.auth())

router
  .group(() => {
    router.get('/', [DashboardController]).as('dashboard')

    // ASSETS
    router.get('/assets', [AssetsController, 'show'])
    router.get('/assets/*', [AssetsController, 'show']).as('assets.show')
    router.delete('/assets/:id', [AssetsController, 'destroy']).as('assets.destroy')
    router
      .post('/assets/:typeId?', [AssetsController, 'store'])
      .as('assets.store')
      .where('typeId', router.matchers.number())
    {
    }

    // ARTICLES
    router.get('/articles', [ArticlesController, 'index']).as('articles.index')
    router.get('/articles/create', [ArticlesController, 'create']).as('articles.create')
    router.post('/articles', [ArticlesController, 'store']).as('articles.store')
    router.get('/articles/:id', [ArticlesController, 'edit']).as('articles.edit')
    router.put('/articles/:id', [ArticlesController, 'update']).as('articles.update')
    router.delete('/articles/:id', [ArticlesController, 'destroy']).as('articles.destroy')

    // TAXONOMIES
    router.get('/taxonomies', [TaxonomiesController, 'index']).as('taxonomies.index')
    router.get('/taxonomies/create', [TaxonomiesController, 'create']).as('taxonomies.create')
    router.post('/taxonomies', [TaxonomiesController, 'store']).as('taxonomies.store')
    router.get('/taxonomies/:id', [TaxonomiesController, 'edit']).as('taxonomies.edit')
    router.put('/taxonomies/:id', [TaxonomiesController, 'update']).as('taxonomies.update')
    router.delete('/taxonomies/:id', [TaxonomiesController, 'destroy']).as('taxonomies.destroy')

    router.get('/collections', [CollectionController, 'index']).as('collections.index')
  })
  .middleware([middleware.auth()])

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import ListArticleController from '../../app/admin/articles/controllers/list_articles_controller.js'
const UpdateArticleController = () =>
  import('../../app/admin/articles/controllers/update_article_controller.js')
const StoreArticleController = () =>
  import('../../app/admin/articles/controllers/store_article_controller.js')
const PagesController = () => import('../../app/admin/pages/controllers/pages_controller.js')

router
  .group(() => {
    router.get('dashboard', [PagesController, 'dashboard']).as('pages.dashboard')
    router.get('articles', [ListArticleController, 'render']).as('articles.index')
    router.get('articles/create', [StoreArticleController, 'render']).as('article.create')
    router.post('articles', [StoreArticleController, 'execute']).as('articles.store')
    router.get('articles/:id/edit', [UpdateArticleController, 'render']).as('articles.edit')
    router.put('articles/:id', [UpdateArticleController, 'execute']).as('articles.update')
  })
  .prefix('admin')
  .as('admin')
  .middleware(middleware.auth())

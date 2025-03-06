import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const HomeController = () => import('#pages/home/controllers/home_controller')
const SerieController = () => import('#pages/series/controller/series_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const StoreCommentController = () =>
  import('../../app/comments/controller/store_comment_controller.js')
const TopicsController = () => import('#pages/topics/controller/topics_controller')
const BlogController = () => import('#pages/blog/controller/blog_controller')

router.get('/', [HomeController, 'render']).as('home')

router
  .get('/login', [LoginController, 'show'])
  .as('login_route_show')
  .middleware(middleware.guest())
router.post('/login', [LoginController, 'execute']).as('login_route')

/**
 * CONTENT
 */
router.get('/topics', [TopicsController, 'render']).as('topics.index')
router.get('/topics/:slug', [TopicsController, 'show']).as('topics.show')
router.get('/series', [SerieController, 'render']).as('series.index')
router.get('/blog', [BlogController, 'render']).as('blog.index')

/* Comments */
router
  .post('/comment', [StoreCommentController, 'execute'])
  .as('comments.store')
  .middleware(middleware.auth())

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const LoginController = () => import('../../app/auth/controllers/login_controller.js')
const HomeController = () => import('../../app/pages/controllers/home_controller.js')

router.get('/', [HomeController, 'render']).as('home')

router
  .get('/login', [LoginController, 'show'])
  .as('login_route_show')
  .middleware(middleware.guest())

router.post('/login', [LoginController, 'execute']).as('login_route')

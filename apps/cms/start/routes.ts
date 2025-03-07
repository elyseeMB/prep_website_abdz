/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import TestsController from '#controllers/articles_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [TestsController, 'index'])

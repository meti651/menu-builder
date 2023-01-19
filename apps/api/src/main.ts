import { isAuthorized } from './utility/security.utility'
import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import userApi from './controllers/user.controller'
import recipeApi from './controllers/recipe.controller'
import ingredientApi from './controllers/ingredient.controller'
import menuApi from './controllers/menu.controller'
import login from './login'
import helmet from 'helmet'
import session = require('cookie-session')
import cors = require('cors')

const server = express()

server.use(cors())
server.set('trust proxy', 1)
server.use(
  session({
    name: 'recipe-builder-session',
    keys: process.env.SESSION_KEYS?.split(','),
    maxAge: 24 * 60 * 60 * 1000
  })
)
server.use(function (req, res, next) {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

server.use(function (req, res, next) {
  console.log(`Incoming request`)
  console.log(`Time: ${Date.now()}`)
  next()
})

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use(helmet())
server.disable('x-powered-by')

server.use('/api', async (req, res, next) => {
  if (await isAuthorized(req, res)) {
    next()
    return
  }
  res.status(301).send('LOGIN_PATH')
})
server.use('/api/users', userApi)
server.use('/api/recipe', recipeApi)
server.use('/api/ingredient', ingredientApi)
server.use('/api/menu', menuApi)
server.use('/login', login)

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

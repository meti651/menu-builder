import prisma from '../prisma/prisma'
import { isAuthorized } from './utility/security.utility'
import express, { Express, Request, Response, NextFunction } from 'express'
import path from 'path'
import userApi from './api/user.controller'
import recipeApi from './api/recipe.controller'
import ingredientApi from './api/ingredient.controller'
import menuApi from './api/menu.controller'
import login from './login'
import helmet from 'helmet'
import session from 'cookie-session'

const app: Express = express()
const PORT = process.env.PORT || 3001

app.set('trust proxy', 1)
app.use(
  session({
    name: 'recipe-builder-session',
    keys: process.env.SESSION_KEYS?.split(','),
    maxAge: 24 * 60 * 60 * 1000
  })
)
app.use(function (req, res, next) {
  req.session!.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

app.use(function (req, res, next) {
  console.log(`Incoming request`)
  console.log(`Time: ${Date.now()}`)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(helmet())
app.disable('x-powered-by')

app.use('/api', async (req, res, next) => {
  if (await isAuthorized(req, res)) {
    next()
    return
  }
  res.status(301).send('LOGIN_PATH')
})
app.use('/api/users', userApi)
app.use('/api/recipe', recipeApi)
app.use('/api/ingredient', ingredientApi)
app.use('/api/menu', menuApi)
app.use('/login', login)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

prisma.$connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
  })
})

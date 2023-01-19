import {Router} from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.send('Recipe api')
})

export default router

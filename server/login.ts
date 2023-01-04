import express from 'express'
import { loginRoute } from './utility/security.utility'
const router = express.Router()

router.post('/', (req, res) => {
  try {
    loginRoute(req, res)
  } catch (e: any) {
    console.log(e.message)
    res.status(500).end()
  }
})

export default router

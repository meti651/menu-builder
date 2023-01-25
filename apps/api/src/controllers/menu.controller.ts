import { createMenu, deleteMenu, getMenuById, getMenus } from '@menu-builder/data-service'
import { Router } from 'express'
const router = Router()

router.get('/', async (req, res) => {
  const menus = await getMenus()
  res.json(menus)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const menu = await getMenuById(id)
  res.json(menu)
})

router.post('/', async (req, res) => {
  const { data } = req.body
  const menu = await createMenu(data)
  res.status(201).json(menu)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const menu = await deleteMenu(id)
  res.status(201).json(menu)
})

export default router

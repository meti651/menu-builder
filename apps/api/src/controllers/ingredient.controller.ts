import { createIngredient, deleteIngredient, getIngredientById, getIngredients } from '@menu-builder/data-service'
import { Router } from 'express'
const router = Router()

router.get('/', async (req, res) => {
  const ingredients = await getIngredients()
  res.json(ingredients)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const ingredient = await getIngredientById(id)
  res.json(ingredient)
})

router.post('/', async (req, res) => {
  const { data } = req.body
  const ingredient = await createIngredient(data)
  res.status(201).json(ingredient)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const ingredient = await deleteIngredient(id)
  res.status(201).json(ingredient)
})

export default router

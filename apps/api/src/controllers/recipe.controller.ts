import { createRecipe, deleteRecipe, getRecipeById, getRecipes } from '@menu-builder/data-service'
import { Router } from 'express'
const router = Router()

router.get('/', async (req, res) => {
  const recipes = await getRecipes()
  res.json(recipes)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const recipe = await getRecipeById(id)
  res.json(recipe)
})

router.post('/', async (req, res) => {
  const { data } = req.body
  const recipe = await createRecipe(data)
  res.json(recipe)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const recipe = await deleteRecipe(id)
  res.json(recipe)
})

export default router

import { Recipe } from '@prisma/client'
import { dataServiceInstance } from './data-service'

export const getRecipes = async () => {
  return await dataServiceInstance.recipe.findMany({ take: 20 })
}

export const getRecipeById = async (id: string) => {
  return await dataServiceInstance.recipe.findUnique({ where: { id } })
}

export const createRecipe = async (recipe: Recipe) => {
  return await dataServiceInstance.recipe.create({ data: recipe })
}

export const deleteRecipe = async (id: string) => {
  return await dataServiceInstance.recipe.delete({ where: { id } })
}

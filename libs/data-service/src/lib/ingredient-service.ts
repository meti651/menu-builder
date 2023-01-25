import { Ingredient } from '@prisma/client'
import { dataServiceInstance } from './data-service'

export const getIngredients = async () => {
  return await dataServiceInstance.ingredient.findMany({ take: 20 })
}

export const getIngredientById = async (id: string) => {
  return await dataServiceInstance.ingredient.findUnique({ where: { id } })
}

export const createIngredient = async (ingredient: Ingredient) => {
  return await dataServiceInstance.ingredient.create({ data: ingredient })
}

export const deleteIngredient = async (id: string) => {
  return await dataServiceInstance.ingredient.delete({ where: { id } })
}

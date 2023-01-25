import { Menu } from '@prisma/client'
import { dataServiceInstance } from './data-service'

export const getMenus = async () => {
  return await dataServiceInstance.menu.findMany({ take: 5 })
}

export const getMenuById = async (id: string) => {
  return await dataServiceInstance.menu.findUnique({ where: { id } })
}

export const createMenu = async (menu: Menu) => {
  return await dataServiceInstance.menu.create({ data: menu })
}

export const deleteMenu = async (id: string) => {
  return await dataServiceInstance.menu.delete({ where: { id } })
}

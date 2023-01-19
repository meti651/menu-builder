import { PrismaClient } from '@prisma/client'
import { IDataService } from '@menu-builder/types'

export class DataService extends PrismaClient implements IDataService {
  constructor() {
    super()
  }

  async connect() {
    this.$connect()
  }

  async disconnect() {
    this.$disconnect()
  }
}

export const dataServiceInstance = new DataService()

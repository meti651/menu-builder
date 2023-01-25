import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { dataServiceInstance } from './data-service'

jest.mock('./data-service', () => ({
  __esModule: true,
  dataServiceInstance: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = dataServiceInstance as unknown as DeepMockProxy<PrismaClient>

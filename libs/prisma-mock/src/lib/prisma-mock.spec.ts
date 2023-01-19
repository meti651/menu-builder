import { prismaMock } from './prisma-mock'

describe('prismaMock', () => {
  it('should work', () => {
    expect(prismaMock()).toEqual('prisma-mock')
  })
})

import { prismaMock } from '@menu-builder/data-service'
import { authorize } from '.'
import { dummyUser } from '@menu-builder/test-data'

describe('Authorize', () => {
  test('should return with false values', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    const response = await authorize('testEmail', 'testPsw')
    expect(response).toEqual({ isLoggedIn: false, exists: false })
  })

  test('should return with the true on the exists property', async () => {
    prismaMock.user.findUnique.mockResolvedValue(dummyUser)
    const response = await authorize(dummyUser.email, 'wrong-password')
    expect(response).toEqual({ isLoggedIn: false, exists: true })
  })

  test('should authorized user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(dummyUser)
    const response = await authorize(dummyUser.email, 'Test_Psw')
    expect(response).toEqual({
      isLoggedIn: true,
      exists: true,
      id: dummyUser.id
    })
  })
})

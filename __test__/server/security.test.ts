import { prismaMock } from '../../prisma/singleton'
import { authorize } from '../../server/security'
import { dummyUser } from '../data/user'

describe('Authorize', () => {
  test('should return with false values', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    await expect(authorize('testEmail', 'testPsw')).resolves.toEqual({ isLoggedIn: false, exists: false })
  })

  test('should return with the true on the exists property', async () => {
    prismaMock.user.findUnique.mockResolvedValue(dummyUser)
    await expect(authorize(dummyUser.email, 'wrong-password')).resolves.toEqual({ isLoggedIn: false, exists: true })
  })

  test('should authorized user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(dummyUser)
    await expect(authorize(dummyUser.email, 'Test_Psw')).resolves.toEqual({
      isLoggedIn: true,
      exists: true,
      id: dummyUser.id
    })
  })
})

import { hashPassword } from '../../src/utility/hash.utility'

export const dummyUser = {
  id: '1',
  email: 'test@test.email',
  name: 'Test User',
  passwordHash: hashPassword('Test_Psw')
}

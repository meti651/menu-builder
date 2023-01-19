import {hashPassword} from '../../server/utility/hash.utility'

export const dummyUser = {
  id: '1',
  email: "test@test.email",
  name: "Test User",
  passwordHash: hashPassword("Test_Psw")
}
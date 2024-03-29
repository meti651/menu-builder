import { findUserByEmail } from '@menu-builder/data-service'
import { IUserLoginData } from './type'
import * as bcrypt from 'bcryptjs'

export const authorize = async (email: string, psw: string): Promise<IUserLoginData> => {
  const user = await findUserByEmail(email)
  if (!user) {
    return {
      isLoggedIn: false,
      exists: false
    }
  }

  const correctPsw = bcrypt.compareSync(psw, user.passwordHash)

  if (!correctPsw) {
    return {
      isLoggedIn: false,
      exists: true
    }
  }

  return {
    isLoggedIn: true,
    exists: true,
    id: user.id
  }
}

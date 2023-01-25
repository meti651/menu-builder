import * as bcrypt from 'bcryptjs'

export const hashPassword = (psw: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(psw, salt)
}

export const checkPsw = (psw: string, hash: string) => {
  return bcrypt.compareSync(psw, hash)
}

import prisma from '../../prisma/prisma'

export const findUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

export const findUserByEmail = async (userEmail: string) => {
  return await prisma.user.findUnique({
    where: {
      email: userEmail
    }
  })
}

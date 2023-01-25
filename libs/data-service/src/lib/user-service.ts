import { dataServiceInstance } from './data-service'

export async function findUserById(userId: string) {
  return await dataServiceInstance.user.findUnique({
    where: {
      id: userId
    }
  })
}

export async function findUserByEmail(userEmail: string) {
  return await dataServiceInstance.user.findUnique({
    where: {
      email: userEmail
    }
  })
}

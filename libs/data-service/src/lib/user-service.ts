import { dataServiceInstance } from './data-service';

export const findUserById = async (userId: string) => {
  return await dataServiceInstance.user.findUnique({
    where: {
      id: userId
    }
  })
}

export const findUserByEmail = async (userEmail: string) => {
  return await dataServiceInstance.user.findUnique({
    where: {
      email: userEmail
    }
  })
}

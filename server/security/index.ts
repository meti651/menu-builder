export interface IUserLoginData {
  isLoggedIn: boolean;
  exists: boolean;
  id: String;
}

export const authorize = (email: String, psw: String): IUserLoginData => {
  return {
    isLoggedIn: true,
    exists: true,
    id: "1",
  };
};

import http from "../../core/services/http.common";

class UserService {
  path = "user"

  signIn(toAuthUser) {
    return http.post(`${this.path}/sign-in`, toAuthUser);
  }

  signUp(toRegisterUser) {
    return http.post(`${this.path}/sign-up`, toRegisterUser);
  }
}

const userService = new UserService();

export { userService };

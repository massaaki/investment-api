import { makeLoginControllerFactory } from "@/main/factories/sessions/login-controller-factory";
import { HttpRequest } from "@/presentation/protocols/http";

type LoginResponse = {
  id: string;
  token: string;
  refreshToken: string
}

export default {
  Mutation: {
    login: async (parent, args): Promise<LoginResponse> => {
      const { email, password } = args

      const controller = makeLoginControllerFactory();
      const httpRequest: HttpRequest = {
        body: {
          email,
          password
        }
      }

      const httpResponse = await controller.handle(httpRequest);

      return {
        id: httpResponse.body.id,
        token: httpResponse.body.token,
        refreshToken: httpResponse.body.refreshToken
      };
    }
  }
}
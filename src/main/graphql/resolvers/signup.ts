import { makeSignupControllerFactory } from "@/main/factories/users/signup-controller-factory"
import { HttpRequest } from "@/presentation/protocols/http";


type SignupResponse = {
  id: string;
  name: string;
  email: string
}

export default {
  Mutation: {
    signup: async (parent, args): Promise<SignupResponse> => {
      const { name, email, password } = args

      const controller = makeSignupControllerFactory();
      const httpRequest: HttpRequest = {
        body: {
          name,
          email,
          password
        }
      }

      const httpResponse = await controller.handle(httpRequest);

      return {
        id: httpResponse.body.id,
        name: httpResponse.body.name,
        email: httpResponse.body.email
      };
    }
  }
}
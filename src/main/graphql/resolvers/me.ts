import { makeInfoUserControllerFactory } from "@/main/factories/users/user-info-controller-factory";
import { HttpRequest } from "@/presentation/protocols/http";

type Response = {
  error?: {
    type: string
  },
  result?: {
    id?: string,
    name?: string,
    email?: string,
    isAdmin?: boolean
  }
}


export default {
  Query: {
    me: async (parent, args, context): Promise<Response> => {
      const auth = context.authentication

      if (auth.error) {
        return {
          error: {
            type: auth.error.message
          }
        }
      }
      const { id } = auth;

      const controller = makeInfoUserControllerFactory()

      const request: HttpRequest = {
        body: {
          id
        }
      }
      const response = await controller.handle(request);
      if (!response) {
        return {
          error: {
            type: 'user not found'
          }
        }
      }

      const { name, email, isAdmin } = response.body;

      return {
        result: {
          id,
          name,
          email,
          isAdmin
        }
      }
    }
  }
}
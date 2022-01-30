import { makeRenewRefreshTokenFactory } from "@/main/factories/sessions/renew-refresh-token-factory";
import { HttpRequest } from "@/presentation/protocols/http";

type RenewRefreshTokenResponse = {
  id: string;
  token: string;
  refreshToken: string
}

export default {
  Mutation: {
    renewRefreshToken: async (parent, args): Promise<RenewRefreshTokenResponse> => {
      const { refreshToken } = args

      const controller = makeRenewRefreshTokenFactory();
      const httpRequest: HttpRequest = {
        body: {
          refreshToken
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
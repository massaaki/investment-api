import { IRenewRefreshToken } from "@/domain/use-cases-protocols/session/renew-refresh-token";
import { ok, serverError, unauthorized } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { RefreshTokenViewModel } from "@/presentation/view-models/refresh-token-view-model";

export class RenewRefreshTokenController implements IController {

  constructor(
    private readonly renewRefreshToken: IRenewRefreshToken
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<RefreshTokenViewModel>> {
    try {
      const { refreshToken } = httpRequest.body;
      const session = await this.renewRefreshToken.renew(refreshToken)

      if (!session) {
        return unauthorized()
      }

      const viewModel: RefreshTokenViewModel = {
        id: session.id,
        isAdmin: session.isAdmin,
        token: session.token,
        refreshToken: session.refreshToken
      }

      return ok(viewModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
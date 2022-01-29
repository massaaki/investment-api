import { IAuthenticate } from "@/domain/use-cases-protocols/session/authenticate";
import { ok, serverError, unauthorized } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { LoginUserViewModel } from "@/presentation/view-models/signin-user-view-model";

export class LoginController implements IController {

  constructor(
    private readonly authenticate: IAuthenticate
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<LoginUserViewModel>> {
    try {
      const { email, password } = httpRequest.body;
      const session = await this.authenticate.auth({
        email,
        password
      })

      if (!session) {
        return unauthorized()
      }

      const viewModel: LoginUserViewModel = {
        id: session.id,
        token: session.token,
        refreshToken: session.refreshToken
      }

      return ok(viewModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
import { ICreateUser } from "@/domain/use-cases-protocols/user/create-user";
import { ok, serverError } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";
import { SignupUserViewModel } from "@/presentation/view-models/signup-user-view-model";

export class SignupController implements IController {

  constructor(
    private readonly createUser: ICreateUser
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<SignupUserViewModel>> {
    try {
      const { name, email, password } = httpRequest.body;
      const user = await this.createUser.create({
        name,
        email,
        password
      })

      const viewModel = {
        id: user.id,
        name: user.name,
        email: user.email
      }

      return ok(viewModel);
    } catch (error) {
      return serverError(error);
    }
  }
}
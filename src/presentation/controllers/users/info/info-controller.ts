import { IInfoUser } from "@/domain/use-cases-protocols/user/info-user";
import { ok, serverError, unauthorized } from "@/presentation/helpers/http-helper";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class InfoControler implements IController {

  constructor(
    private readonly infoUser: IInfoUser
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    try {
      const { id } = httpRequest.body;
      const user = await this.infoUser.me(id);

      if (!user) {
        return unauthorized();
      }

      return ok(user);
    } catch (error) {
      return serverError(error);
    }
  }
}
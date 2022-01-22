
import { Request, Response } from 'express'

import { ICreateUser } from '@/domain/use-cases-protocols/user/create-user';

export class SignUpController {
  constructor(private readonly createUser: ICreateUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const user = await this.createUser.create({
        name,
        email,
        password
      })
      return response.status(200).json({
        body: user,
      });
    } catch (err) {
      return response.status(500).json({
        body: null,
      });
    }
  }
}

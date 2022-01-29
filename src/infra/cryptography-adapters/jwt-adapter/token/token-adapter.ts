import { sign } from 'jsonwebtoken';

import { IToken } from "@/application/infra-protocols/criptography/token";

export class TokenAdapter implements IToken {
  constructor(private readonly secret: string) {}

  async generate(userId: string, expiresInMinutes: number): Promise<string> {
    const token = await sign({ id: userId }, this.secret, {
      expiresIn: expiresInMinutes * 60 //express in process in seconds
    });

    return token;
  }

}
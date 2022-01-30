import { sign } from 'jsonwebtoken';

import { ITokenEncrypter } from "@/application/infra-protocols/criptography/token-encrypter";

export class TokenEncrypterAdapter implements ITokenEncrypter {
  constructor(private readonly secret: string) {}

  async generate(userId: string, expiresInMinutes: number): Promise<string> {
    const token = await sign({ id: userId }, this.secret, {
      expiresIn: expiresInMinutes * 60 //express in process in seconds
    });

    return token;
  }

}
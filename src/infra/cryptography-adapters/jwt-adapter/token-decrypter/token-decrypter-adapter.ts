import { verify } from 'jsonwebtoken';

import { ITokenDecrypter } from '@/application/infra-protocols/criptography/token-decrypter';
import { TokenDecrypterResponseDto } from '@/application/dtos/token-decrypter-dto/token-decrypter-response-dto';

export class TokenDecrypterAdapter implements ITokenDecrypter {
  constructor(private readonly secret: string) {}

  async decrypt(token: string): Promise<TokenDecrypterResponseDto> {
    const value: any = await verify(token, this.secret);
    if (value) {
      return {
        expiresAt: new Date(value.exp),
        id: value.id
      };
    };
    return null;
  }

}
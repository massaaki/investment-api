import { TokenDecrypterResponseDto } from "@/application/dtos/token-decrypter-dto/token-decrypter-response-dto";

export interface ITokenDecrypter {
  decrypt(token: string): Promise<TokenDecrypterResponseDto>;
}
export interface ITokenEncrypter {
  generate(userId: string, expiresInMinutes: number): Promise<string>;
}
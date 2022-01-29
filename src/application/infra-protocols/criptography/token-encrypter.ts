export interface IToken {
  generate(userId: string, expiresInMinutes: number): Promise<string>;
}
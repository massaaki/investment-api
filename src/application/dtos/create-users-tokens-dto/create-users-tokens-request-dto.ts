export type CreateUsersTokensRequestDto = {
  userId: string;
  refreshToken: string;
  expiresAt: Date;
}
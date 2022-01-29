export type CreateUsersTokensRequestDto = {
  userId: string;
  refreshToken: string;
  expires_at: Date;
}
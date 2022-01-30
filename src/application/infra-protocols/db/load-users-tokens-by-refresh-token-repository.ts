import { LoadUsersTokensByRefreshTokenResponseDto } from '../../dtos/load-users-tokens-by-refresh-token-dto/load-users-tokens-by-refresh-token-response-dto';

export interface ILoadUsersTokensByRefreshTokenRepository {
  loadByRefreshToken(refreshToken: string): Promise<LoadUsersTokensByRefreshTokenResponseDto>;
}

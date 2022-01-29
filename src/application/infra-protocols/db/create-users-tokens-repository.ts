import { CreateUsersTokensRequestDto } from '../../dtos/create-users-tokens-dto/create-users-tokens-request-dto';
import { CreateUsersTokensResponseDto } from '../../dtos/create-users-tokens-dto/create-users-tokens-response-dto';

export interface ICreateUsersTokensRepository {
  create(data: CreateUsersTokensRequestDto): Promise<CreateUsersTokensResponseDto>;
}
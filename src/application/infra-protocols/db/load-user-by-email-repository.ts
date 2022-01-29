import { CreateUserByEmailResponseDto } from '../../dtos/load-user-by-email-dto/create-user-by-email-response-dto';

export interface ILoadUserByEmailRepository {
  loadByEmail(email: string): Promise<CreateUserByEmailResponseDto>;
}

import { CreateUserByIdResponseDto } from '../../dtos/load-user-by-id-dto/load-user-by-id-response-dto';

export interface ILoadUserByIdRepository {
  loadById(id: string): Promise<CreateUserByIdResponseDto>;
}

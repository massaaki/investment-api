import { CreateUserRequestDTO } from "@/application/infra-protocols/dtos/create-user-request-dto";
import { CreateUserResponseDTO } from "@/application/infra-protocols/dtos/create-user-response-dto";
export interface ICreateUserRepository {
  create(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO>;
}

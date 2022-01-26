import { CreateUserRequestDTO } from "@/application/dtos/create-user-request-dto";
import { CreateUserResponseDTO } from "@/application/dtos/create-user-response-dto";

export interface ICreateUserRepository {
  create(userData: CreateUserRequestDTO): Promise<CreateUserResponseDTO>;
}

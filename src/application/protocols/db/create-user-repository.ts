import { IUser } from "@/domain/entities/user";

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export interface ICreateUserRepository {
  create(userData: CreateUserProps): Promise<IUser>;
}

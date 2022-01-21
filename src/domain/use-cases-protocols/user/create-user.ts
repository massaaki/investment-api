import { IUser } from "@/domain/entities/user";

export type CreateUserProps = {
  name: string;
  email: string;
  password: string;
};

export interface ICreateUser {
  create: (user: CreateUserProps) => Promise<IUser>;
}

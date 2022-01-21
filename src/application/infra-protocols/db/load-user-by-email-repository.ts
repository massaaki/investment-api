import { IUser } from "@/domain/entities/user";

export interface ILoadUserByEmailRepository {
  loadByEmail(email: string): Promise<IUser>;
}

import { IUser } from "@/domain/entities/user";

export interface ILoadUserByEmail {
  loadByEmail(email: string): Promise<IUser>;
}
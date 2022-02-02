import { IUser } from "@/domain/entities/user";

export interface IInfoUser {
  me(id: string): Promise<IUser>
}
import { ISession } from "@/domain/entities/session";

export type AuthenticateProps = {
  email: string;
  password: string;
}

export interface IAuthenticate {
  auth(data: AuthenticateProps): Promise<ISession>;
}
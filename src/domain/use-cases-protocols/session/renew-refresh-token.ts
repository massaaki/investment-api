import { ISession } from "@/domain/entities/session";

export interface IRenewRefreshToken {
  renew(refreshToken: string): Promise<ISession>
}
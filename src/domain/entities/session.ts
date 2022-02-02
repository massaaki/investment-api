export interface ISession {
  id: string;
  token?: string;
  isAdmin?: boolean;
  refreshToken: string;
}
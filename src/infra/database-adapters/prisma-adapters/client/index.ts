import { PrismaClient } from '@prisma/client'


export class Client {
  private static instance: PrismaClient = null

  public static getInstance(): PrismaClient {
    if (Client.instance === null) {
      Client.instance = new PrismaClient();
    }

    return Client.instance;
  }
}
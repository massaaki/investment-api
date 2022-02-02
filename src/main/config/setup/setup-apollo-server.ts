import { Client } from '@/infra/database-adapters/prisma-adapters/client'
import { ApolloServer } from 'apollo-server-express';
import { Express } from "express";

import typeDefs from '../../graphql/typedefs/';
import resolvers from '../../graphql/resolvers';

import { env } from '../../config/env';
import { TokenDecrypterAdapter } from '@/infra/cryptography-adapters/jwt-adapter/token-decrypter/token-decrypter-adapter';


const validateAuthentication = async (token: string) => {
  const decrypter = new TokenDecrypterAdapter(env.jwtSecret);
  try {
    const decoded = await decrypter.decrypt(token);
    const currentTime = new Date().getTime();
    const expiresTiem = decoded.expiresAt.getTime() - currentTime;

    //Pending verify token expired

    //verify if isAdmin
    const user = await Client.getInstance().user.findFirst({ where: { id: decoded.id } })

    return {
      id: decoded.id,
      isAdmin: user.is_admin
    }

  } catch (error) {
    // console.log(error.name); //JsonWebTokenError
    // console.log(error.message); //invalid token
    return {
      error: {
        name: error.name,
        message: error.message
      }
    }
  }
}


export default async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      const bearerToken = req.headers.authorization || ''
      let authentication = null;
      if (bearerToken) {
        const [, token] = bearerToken.split(" ");
        authentication = await validateAuthentication(token);
      }

      return { authentication };
    }
  })

  await server.start();

  server.applyMiddleware({ app }); //grate a route /graphql
};

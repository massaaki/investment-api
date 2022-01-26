

import { ApolloServer } from 'apollo-server-express';
import { Express } from "express";

import typeDefs from '../../graphql/typedefs/';
import resolvers from '../../graphql/resolvers';

export default async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })

  await server.start();

  server.applyMiddleware({ app }); //grate a route /graphql
};

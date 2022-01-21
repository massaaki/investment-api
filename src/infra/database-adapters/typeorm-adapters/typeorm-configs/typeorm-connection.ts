import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const response = await createConnection(
    Object.assign(defaultOptions, {
      host: "localhost",
      port: 5432,
      username: "root",
      password: "secret",
      database: "bullbearinvest",
    })
  );

  return response;
};

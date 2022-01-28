import { DbCreateUser } from "@/application/use-cases-implementations/user/db-create-user";
import { HashAdapter } from "@/infra/cryptography-adapters/bcrypt-adapter/hash-adapter";
import { TypeormPostgresCreateUserRepository } from "@/infra/database-adapters/typeorm-adapters/typeorm-postgres-repositories/typeorm-postgres-users-repository/typeorm-postgres-create-user-repository";
import { TypeormPostgresLoadUserByEmailRepository } from "@/infra/database-adapters/typeorm-adapters/typeorm-postgres-repositories/typeorm-postgres-users-repository/typeorm-postgres-load-user-by-email-repository";
import { SignupController } from "@/presentation/controllers/users/signup/signup-controller";
import { IController } from "@/presentation/protocols/controller";

export const makeSignupControllerFactory = (): IController => {
  const hashAdapter = new HashAdapter();
  const createUserRepository = new TypeormPostgresCreateUserRepository();
  const loadUserByEmailRepository = new TypeormPostgresLoadUserByEmailRepository();
  const dbCreateUser = new DbCreateUser(hashAdapter, createUserRepository, loadUserByEmailRepository);
  const signupController = new SignupController(dbCreateUser);

  return signupController;
}
import { DbCreateUser } from "@/application/use-cases-implementations/user/db-create-user";
import { HashAdapter } from "@/infra/cryptography-adapters/bcrypt-adapter/hash-adapter";
import { TypeormPostgresCreateUserRepository } from "@/infra/database-adapters/typeorm-adapters/typeorm-postgres-repositories/typeorm-postgres-users-repository/typeorm-postgres-create-user-repository";
import { TypeormPostgresLoadUserByEmailRepository } from "@/infra/database-adapters/typeorm-adapters/typeorm-postgres-repositories/typeorm-postgres-users-repository/typeorm-postgres-load-user-by-email-repository";
import { Router } from "express";
import { SignUpController } from "../controllers/users/signup/signup-controller";


const hashAdapter = new HashAdapter();
const createUserRepository = new TypeormPostgresCreateUserRepository();
const loadUserByEmailRepository = new TypeormPostgresLoadUserByEmailRepository();

const dbCreateUser = new DbCreateUser(hashAdapter, createUserRepository, loadUserByEmailRepository);
const signupController = new SignUpController(dbCreateUser);

export default (router: Router): void => {
  router.post("/user", async (req, res) => {
    await signupController.handle(req, res)
  });
}


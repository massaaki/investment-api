import { Router } from "express";
import { makeSignupControllerFactory } from "../factories/users/signup-controller-factory";
import { adaptRoute } from "../adapters/express-routes-adapter";

export default (router: Router): void => {
  router.post("/user", adaptRoute(makeSignupControllerFactory()));
}

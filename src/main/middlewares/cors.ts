import { Request, Response, NextFunction } from "express";
import { env } from '../config/env'

export const cors = (req: Request, res: Response, next: NextFunction): void => {

  res.set("Access-Control-Allow-Origin", env.originUrl);
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "*");
  next();
};

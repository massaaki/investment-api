import bcrypt from "bcrypt";

import { IHasher } from "@/application/infra-protocols/criptography/hasher";

export class HashAdapter implements IHasher {
  async hash(value: string): Promise<string> {
    const salt = 12;

    const hashedValue = bcrypt.hash(value, salt);
    return hashedValue;
  }
}

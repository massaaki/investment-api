import bcrypt from 'bcrypt';

import { IHashComparer } from "@/application/infra-protocols/criptography/hash-comparer";

export class HashComparer implements IHashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    const compareResult = await bcrypt.compare(value, hash);
    return compareResult;
  }
}
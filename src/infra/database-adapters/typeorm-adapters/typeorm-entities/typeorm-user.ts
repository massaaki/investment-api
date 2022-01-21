import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  hashed_password: string;

  @CreateDateColumn()
  created_at: string;

  @CreateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

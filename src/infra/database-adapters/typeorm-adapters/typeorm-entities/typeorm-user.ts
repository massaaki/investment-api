import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn('text', { nullable: false })
  id?: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
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

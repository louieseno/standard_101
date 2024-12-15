import { IsEmail, IsEnum, IsNotEmpty, IsString, } from "class-validator";

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum UserRole {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  @IsNotEmpty()
  @IsString()
  name: string

  @Column('varchar')
  @IsEmail()
  email: string

  @Column({
    type: "enum",
    enum: UserRole,
  })
  @IsEnum(['ADMIN', 'EMPLOYEE'], { message: 'Valid role required.' })
  role: UserRole

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  update_at: Date
}
import { PartialType } from "@nestjs/mapped-types";
import { User } from "./user.entity";

export class UpdateUserEntity extends PartialType(User) { }
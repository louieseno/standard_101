import { PartialType } from "@nestjs/swagger";
import { User } from "./user.entity";

export class UpdateUserEntity extends PartialType(User) { }
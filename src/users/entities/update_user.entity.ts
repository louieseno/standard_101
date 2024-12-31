import { PartialType } from "@nestjs/swagger";
import { User } from "./user.entity";

export class UpdateUser extends PartialType(User) { }
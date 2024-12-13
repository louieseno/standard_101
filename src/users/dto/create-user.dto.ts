import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;


  @IsEnum(['ADMIN', 'EMPLOYEE'], { message: 'Valid role required.' })
  role: 'ADMIN' | 'EMPLOYEE';
}
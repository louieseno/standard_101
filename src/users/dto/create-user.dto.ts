export class CreateUserDTO {
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
}
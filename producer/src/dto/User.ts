import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

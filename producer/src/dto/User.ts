import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class User {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;

  age: string;
}

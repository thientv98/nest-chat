import { UserUniqueEmailValidator } from '../validator/user-unique-email.validator';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Validate(UserUniqueEmailValidator, ['email'])
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  displayName: string;

  @IsNotEmpty()
  password: string;
}

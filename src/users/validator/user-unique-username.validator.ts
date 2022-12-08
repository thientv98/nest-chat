import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'userUniqueEmailValidator', async: true })
@Injectable()
export class UserUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}

  async validate(text: string) {
    console.log(text);

    const user = await this.userService.findBy({ email: text });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this username already exists.';
  }
}

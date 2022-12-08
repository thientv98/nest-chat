import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'userUniqueEmailValidator', async: true })
@Injectable()
export class UserUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}

  async validate(text: string, args: ValidationArguments) {
    const field = args.constraints[0];

    const user = await this.userService.findBy({ field: text });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}

import { User } from './../schema/user.schema';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  saveUser(): string {
    this.userService.create({
      name: 'test',
      age: '123',
      breed: 'test',
    });

    return 'Hello World!';
  }

  @Get('/list')
  async getUser(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }
}

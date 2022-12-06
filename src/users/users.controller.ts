import { User } from './../schema/user.schema';
import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { hashSync } from 'bcrypt';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(): string {
    const password = hashSync('123456', 10);
    this.userService.create({
      email: 'test2@example.com',
      username: 'test2',
      displayName: 'Test 2',
      password: password,
    });

    return 'Hello World!';
  }

  @Get()
  async get(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }
}

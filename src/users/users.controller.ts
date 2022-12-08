import { User } from './entities/user.entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    this.userService.create(createUserDto);

    return 'Hello World!';
  }

  @Get()
  async get(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }
}

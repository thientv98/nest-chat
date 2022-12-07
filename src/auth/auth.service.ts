import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findBy({ username });
    if (user) {
      const match = await compare(password, user.password);
      if (match) {
        return user;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload = { ...user };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

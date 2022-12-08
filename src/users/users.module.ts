import { UserUniqueEmailValidator } from './validator/user-unique-email.validator';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UserUniqueEmailValidator, UsersService],
  exports: [UsersService],
})
export class UsersModule {}

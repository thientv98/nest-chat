import { hashSync } from 'bcrypt';
import { UserDocument } from './entities/user.entity';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: any): Promise<User> {
    createUserDto.password = hashSync(createUserDto.password, 10);
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findBy(find: any) {
    return this.userModel.findOne(find).exec();
  }
}

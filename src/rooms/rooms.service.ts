import { Room, RoomDocument } from './entities/room.entity';
import { User, UserDocument } from './../users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return new this.roomModel({
      ...createRoomDto,
      owner: (await this.userModel.findOne()).id,
      members: (await this.userModel.find().exec()).slice(0, 2).map((x) => x.id),
    }).save();
  }

  async findAll(query: ListAllEntities) {
    return this.roomModel.find(query).exec();
  }

  async findOne(id: string) {
    return this.roomModel.findOne({ _id: id }).populate('owner').populate('members').exec();
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.findOneAndUpdate({ _id: id }, updateRoomDto).exec();
  }

  async remove(id: string) {
    return this.roomModel.findByIdAndDelete(id).exec();
  }

  async removeAll() {
    return this.roomModel.deleteMany().exec();
  }
}

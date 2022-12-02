import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schema/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}
  
  async create(createRoomDto: CreateRoomDto) {
    return new this.roomModel(createRoomDto).save();
  }

  async findAll() {
    return this.roomModel.find().exec();
  }

  async findOne(id: string) {
    return this.roomModel.findOne({_id: id}).exec();
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.findOneAndUpdate({_id: id}, updateRoomDto).exec();
  }

  async remove(id: string) {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}

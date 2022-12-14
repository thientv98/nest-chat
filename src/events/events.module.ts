import { Room, RoomSchema } from './../rooms/entities/room.entity';
import { User, UserSchema } from './../users/entities/user.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from 'src/rooms/rooms.service';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [EventsGateway, RoomsService],
})
export class EventsModule {}

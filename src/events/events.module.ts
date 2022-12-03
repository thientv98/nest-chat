import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room, RoomSchema } from 'src/schema/room.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }, { name: User.name, schema: UserSchema }]),
  ],
  providers: [
    EventsGateway, 
    RoomsService
  ],
})
export class EventsModule {}
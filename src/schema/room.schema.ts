import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  title: string;

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const RoomSchema = SchemaFactory.createForClass(Room);
import { User } from './../../users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
  members: User[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

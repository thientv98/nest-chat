import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { RoomsService } from 'src/rooms/rooms.service';
import { RoomDocument } from 'src/schema/room.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly roomsService: RoomsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('getJoinedRooms')
  async sendMsg(@MessageBody() data: any): Promise<Observable<WsResponse<RoomDocument>>> {
    const rooms = await this.roomsService.findAll({ owner: data.msg as string });
    return from(rooms).pipe(map((item) => ({ event: 'chatRoom', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}

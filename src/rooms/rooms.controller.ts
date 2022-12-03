import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    // fetch('http://localhost:8000/rooms', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title: 'Room from fetch()'})});
    return await this.roomsService.create(createRoomDto);
  }

  @Get()
  async findAll(@Query() query: ListAllEntities) {
    return await this.roomsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.roomsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    // fetch('http://localhost:8000/rooms/id', { method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({title: 'Room from fetch() [edit]'})});
    return await this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // fetch('http://localhost:8000/rooms/id', { method: 'DELETE'});
    return await this.roomsService.remove(id);
  }
}

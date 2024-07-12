import { RoomService } from '@/src/backend/domains/room.service';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from 'next-api-decorators';
import { CreateRoomRequest, UpdateRoomRequest } from './request';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class RoomHandler extends BaseHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return RoomService.getService().getRoomById(id);
  }

  @Get()
  @HttpCode(201)
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    return RoomService.getService().getRooms({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateRoomRequest) {
    return RoomService.getService().createRoom(body);
  }

  @Put('/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateRoomRequest) {
    return RoomService.getService().updateRoom(id, body);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return RoomService.getService().deleteRoom(id);
  }
}

export default enhancedHandler(RoomHandler);

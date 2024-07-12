import { AttendanceService } from '@/src/backend/domains/attendance.service';
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
import { CreateAttendanceRequest, UpdateAttendanceRequest } from './request';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class AttendanceHandler extends BaseHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return AttendanceService.getService().getAttendanceById(id);
  }

  @Get()
  @HttpCode(200)
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    
    return AttendanceService.getService().getAttendances({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateAttendanceRequest) {
    return AttendanceService.getService().createAttendance(body);
  }

  @Put('/:id')
  @HttpCode(202)
  update(@Param('id') id: string, @Body() body: UpdateAttendanceRequest) {
    return AttendanceService.getService().updateAttendance(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return AttendanceService.getService().deleteAttendance(id);
  }
}

export default enhancedHandler(AttendanceHandler);

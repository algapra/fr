import { StatusService } from '@/src/backend/domains/status.service';
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
import { CreateStatusRequest, UpdateStatusRequest } from './request';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class StatusHandler extends BaseHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return StatusService.getService().getStatusById(id);
  }

  @Get()
  @HttpCode(200)
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    
    return StatusService.getService().getStatuss({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateStatusRequest) {
    return StatusService.getService().createStatus(body);
  }

  @Put('/:id')
  @HttpCode(202)
  update(@Param('id') id: string, @Body() body: UpdateStatusRequest) {
    return StatusService.getService().updateStatus(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return StatusService.getService().deleteStatus(id);
  }
}

export default enhancedHandler(StatusHandler);

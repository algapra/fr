import { AccessService } from '@/src/backend/domains/access.service';
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
import { CreateAccessRequest, UpdateAccessRequest } from './request';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class AccessHandler extends BaseHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return AccessService.getService().getAccessById(id);
  }

  @Get()
  @HttpCode(201)
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string,
  ) {
    return AccessService.getService().getAccesses({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateAccessRequest) {
    return AccessService.getService().createAccess(body);
  }

  @Put('/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateAccessRequest) {
    return AccessService.getService().updateAccess(id, body);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return AccessService.getService().deleteAccess(id);
  }
}

export default enhancedHandler(AccessHandler);

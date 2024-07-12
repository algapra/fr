import { DepartmentService } from '@/src/backend/domains/department.service';
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
import { CreateDepartmentRequest, UpdateDepartmentRequest } from './request';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class DepartmentHandler extends BaseHandler {
  @Get('/:id')
  @HttpCode(200)
  show(@Param('id') id: string) {
    return DepartmentService.getService().getDepartmentById(id);
  }

  @Get()
  @HttpCode(200)
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string,
  ) {
    return DepartmentService.getService().getDepartments({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @HttpCode(200)
  create(@Body() body: CreateDepartmentRequest) {
    return DepartmentService.getService().createDepartment(body);
  }

  @Put('/:id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateDepartmentRequest) {
    return DepartmentService.getService().updateDepartment(id, body);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return DepartmentService.getService().deleteDepartment(id);
  }

  @Post('/:property/exists')
  @HttpCode(200)
  exists(
    @Param('property') property: string,
    @Body() body: Partial<CreateDepartmentRequest>,
  ) {
    return DepartmentService.getService().existanceCheck(body, property);
  }
}

export default enhancedHandler(DepartmentHandler);

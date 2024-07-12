import { MemberService } from '@/src/backend/domains/member.service';
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
import { CreateMemberRequest, UpdateMemberRequest } from './request';
import { SessionGuard } from '@/src/backend/middlewares/api/decorators/SessionGuard';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class MemberHandler extends BaseHandler {
  @Get('/:id')
  @HttpCode(200)
  @SessionGuard()
  show(@Param('id') id: string) {
    return MemberService.getService().getMemberById(id);
  }

  @Get()
  @HttpCode(200)
  @SessionGuard()
  index(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string
  ) {
    
    return MemberService.getService().getMembers({
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
      search,
    });
  }

  @Post()
  @SessionGuard()
  @HttpCode(201)
  create(@Body() body: CreateMemberRequest) {
    return MemberService.getService().createMember(body);
  }

  @Put('/:id')
  @HttpCode(202)
  update(@Param('id') id: string, @Body() body: UpdateMemberRequest) {
    return MemberService.getService().updateMember(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return MemberService.getService().deleteMember(id);
  }

  @Post('/:property/exists')
  @HttpCode(200)
  exists(
    @Param('property') property: string,
    @Body() body: Partial<CreateMemberRequest>
  ) {
    return MemberService.getService().existanceCheck(body, property);
  }
}

export default enhancedHandler(MemberHandler);

import { AttendanceEntity } from '@/src/backend/infrastructure/database/attendance/attendance.entity';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateMemberRequest {
  @IsString()
  avatar!: string;

  @IsString()
  fullName!: string;

  @IsString()
  nik!: string;

  @IsString()
  role!: string;

  @Type(() => AttendanceEntity)
  attendances?: AttendanceEntity;

  @IsString()
  statuses!: string;
}

export class UpdateMemberRequest extends CreateMemberRequest {}

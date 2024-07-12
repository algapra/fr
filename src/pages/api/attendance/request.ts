import { IsString } from 'class-validator';

export class CreateAttendanceRequest {
  @IsString()
  type!: string;
}

export class UpdateAttendanceRequest extends CreateAttendanceRequest {}

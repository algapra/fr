import { DepartmentEntity } from '@/src/backend/infrastructure/database/department/department.entity';
import { RoomEntity } from '@/src/backend/infrastructure/database/room/room.entity';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateAccessRequest {
  @IsString()
  roleName!: string;

  @IsNumber()
  quoteAccess!: number;

  @Type(() => DepartmentEntity)
  department?: DepartmentEntity;

  @Type(() => RoomEntity)
  room?: RoomEntity;
}

export class UpdateAccessRequest extends CreateAccessRequest {}

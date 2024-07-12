import { IsString } from 'class-validator';

export class CreateDepartmentRequest {
  @IsString()
  department!: string;
}

export class UpdateDepartmentRequest extends CreateDepartmentRequest {}

import { IsString } from 'class-validator';

export class CreateStatusRequest {
  @IsString()
  type!: string;
}

export class UpdateStatusRequest extends CreateStatusRequest {}

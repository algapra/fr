import { IsNumber, IsString } from 'class-validator';

export class CreateRoomRequest {
  @IsNumber()
  floor!: number;

  @IsString()
  roomName!: string;
}

export class UpdateRoomRequest extends CreateRoomRequest {}

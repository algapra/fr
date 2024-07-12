import { IsString } from 'class-validator';

export class RegisterFaceRequest {
  @IsString()
  image!: string;
  
  @IsString()
  user_id!: string;

  @IsString()
  user_name!: string;
}
import { IsString } from 'class-validator';

export class IdentifyFaceRequest {
  @IsString()
  image!: string;
}
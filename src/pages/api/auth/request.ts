import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}

export class RegisterRequest {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  name!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  address!: string;

  @IsString()
  companyName!: string;

  @IsString()
  companyEmail!: string;

  @IsString()
  companyAddress!: string;

  @IsString()
  companyType!: string;

  @IsString()
  companyField!: string;

  @IsString()
  companyPhoneNumber!: string;

  @IsString()
  memberCount!: number;
}

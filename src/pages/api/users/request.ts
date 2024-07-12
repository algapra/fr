import { IsOptional, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  email!: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  password!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  name!: string;

  @IsString()
  address?: string;

  companyId!: string;
}

export class CreateCompanyRequest {
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

export class ExistanceCheckRequest {
  @IsString()
  param!: string;
}

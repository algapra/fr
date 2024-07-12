import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentMidtransRequest {
  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  quantity!: number;
}

export class PaymentMidtransCallbackRequest {
  @IsString()
  invoiceId!: string;

  @IsString()
  status!: string;

  @IsString()
  statusCode!: string;

  @IsOptional()
  simulation?: boolean;
}

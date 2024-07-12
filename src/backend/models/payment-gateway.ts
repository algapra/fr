interface MidtransI {
  token: string;
  redirect_url: string;
}

export interface PaymentGatewayData {
  Midtrans: MidtransI;
}
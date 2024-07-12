import * as jose from 'jose';
import { config } from '@/config';

export const encode = (data: any) => {
  const secret = config.jwtSecret;

  return new jose.SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(secret));
};

export const validate = <T>(token: string) => {
  return jose.jwtVerify<T>(token, new TextEncoder().encode(config.jwtSecret), {
    algorithms: ['HS256'],
  });
};

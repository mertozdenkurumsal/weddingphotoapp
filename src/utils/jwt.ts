import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtTokenPair = {
  accessToken: string;
  refreshToken: string;
};

export function signAccessToken(payload: object): string {
  const options: SignOptions = { expiresIn: env.accessTokenTtl as unknown as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.jwtAccessSecret, options);
}

export function signRefreshToken(payload: object): string {
  const options: SignOptions = { expiresIn: env.refreshTokenTtl as unknown as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.jwtRefreshSecret, options);
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, env.jwtAccessSecret);
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, env.jwtRefreshSecret);
}

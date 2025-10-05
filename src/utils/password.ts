import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string): Promise<string> {
  return await bcrypt.hash(plainPassword, BCRYPT_SALT_ROUNDS);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

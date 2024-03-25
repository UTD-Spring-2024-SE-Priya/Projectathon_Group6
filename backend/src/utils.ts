import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  // return bcrypt.hashSync(password, 10);  
  return await bcrypt.hash(password, saltRounds);
}
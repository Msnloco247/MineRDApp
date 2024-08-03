import bcrypt from 'bcryptjs';

// Función para hash de contraseña
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Número de rondas de sal
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Función para verificar contraseña
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
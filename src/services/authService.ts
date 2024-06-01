import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '7gqGgYQ1LzM^&u^%AMO@x!cpTmXivJk8Bfz'; // Exemplo de chave JWT segura

// Simulação de um banco de dados de usuários (pode ser substituído por um banco de dados real
const usersDB: { [key: string]: { id: string; username: string; passwordHash: string } } = {};

export const register = async (username: string, password: string): Promise<{ id: string; username: string }> => {
  if (usersDB[username]) {
    throw new Error('Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const id = Math.random().toString(36).substr(2, 9); 
  usersDB[username] = { id, username, passwordHash };

  return { id, username };
};

export const login = async (username: string, password: string): Promise<string | null> => {
  const user = usersDB[username];

  if (!user) {
    return null; 
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return null; 
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

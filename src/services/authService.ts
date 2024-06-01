// src/services/authService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import pool from '../utils/db';
import { User } from '../models/user';

const JWT_SECRET = 'your_jwt_secret';

export const register = async (username: string, password: string): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  const result = await pool.query(
    'INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *',
    [id, username, hashedPassword]
  );

  return result.rows[0];
};

export const login = async (username: string, password: string): Promise<string | null> => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  return null;
};

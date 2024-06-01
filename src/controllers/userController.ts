// src/controllers/userController.ts
import { Request, Response } from 'express';
import { register, login } from '../services/authService';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await register(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

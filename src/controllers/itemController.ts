// src/controllers/itemController.ts
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../utils/db';
import { Item } from '../models/item';

export const addItem = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const id = uuidv4();
    const user_id = req.userId;

    const result = await pool.query(
      'INSERT INTO items (id, user_id, name, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, user_id, name, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const user_id = req.userId;
    const result = await pool.query('SELECT * FROM items WHERE user_id = $1', [user_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id, name, description } = req.body;
    const user_id = req.userId;

    const result = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [name, description, id, user_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user_id = req.userId;

    await pool.query('DELETE FROM items WHERE id = $1 AND user_id = $2', [id, user_id]);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

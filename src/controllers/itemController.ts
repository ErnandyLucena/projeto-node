import { Request, Response } from 'express';
import pool from '../utils/db';

// Obtém todos os itens
export const getItems = async (req: Request, res: Response) => {
  try {
    const response = await pool.query('SELECT * FROM items');
    res.json(response.rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Atualiza um item pelo ID
export const updateItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const { name, description } = req.body;

  try {
    const response = await pool.query(
      'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, itemId]
    );
    res.json(response.rows[0]);
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Deleta um item pelo ID
export const deleteItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const response = await pool.query('DELETE FROM items WHERE id = $1', [itemId]);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

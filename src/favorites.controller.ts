import { Request, Response } from 'express';
import pool from './db';

export const getFavorites = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM favorites');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  const { recipe_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO favorites (recipe_id) VALUES ($1) RETURNING *',
      [recipe_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM favorites WHERE id = $1', [id]);
    res.json({ message: 'Favorito removido' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
};

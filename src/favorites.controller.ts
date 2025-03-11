// favorites.controller.ts
import { Request, Response } from 'express';
import pool from './db';


export const getFavorites = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM favorites');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar favoritos:', err);
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
};



export const addFavorite = async (req: Request, res: Response) => {
  const { recipe_id, name, instructions, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO favorites (recipe_id, name, instructions, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [recipe_id, name, instructions, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao adicionar favorito:', err);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
};



export const removeFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM favorites WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }
    res.json({ message: 'Favorito removido' });
  } catch (err) {
    console.error('Erro ao remover favorito:', err);
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
  
};

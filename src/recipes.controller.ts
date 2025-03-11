import { Request, Response } from 'express';
import pool from './db';

// 🥗 Listar todas as receitas
export const getRecipes = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar receitas' });
  }
};

// ➕ Criar uma nova receita
export const createRecipe = async (req: Request, res: Response) => {
  const { name, instructions, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO recipes (name, instructions, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, instructions, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar receita' });
  }
};
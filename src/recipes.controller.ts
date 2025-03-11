import { Request, Response } from 'express';
import pool from './db';


export const getRecipes = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar receitas:', err);
    res.status(500).json({ error: 'Erro ao buscar receitas' });
  }
};



export const createRecipe = async (req: Request, res: Response) => {
  const { name, instructions, image_url } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO recipes (name, instructions, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, instructions, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar receita:', err);
    res.status(500).json({ error: 'Erro ao criar receita' });
  }
};



export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM recipes WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }
    res.json({ message: 'Receita deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar receita:', err);
    res.status(500).json({ error: 'Erro ao deletar receita' });
  }
  
};

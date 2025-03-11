import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from './favorites.controller';

const router = express.Router();

router.get('/favorites', getFavorites); // Listar favoritos
router.post('/favorites', addFavorite); // Adicionar aos favoritos
router.delete('/favorites/:id', removeFavorite); // Remover dos favoritos

export default router;
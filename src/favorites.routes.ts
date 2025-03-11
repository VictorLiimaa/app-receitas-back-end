import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from './favorites.controller';

const router = express.Router();

router.get('/favorites', getFavorites); 
router.post('/favorites', addFavorite); 
router.delete('/favorites/:id', removeFavorite); 

export default router;

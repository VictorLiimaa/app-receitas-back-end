import express from 'express';
import { getRecipes, createRecipe, deleteRecipe } from './recipes.controller';

const router = express.Router();

router.get('/recipes', getRecipes);

router.post('/recipes', createRecipe);

router.delete('/recipes/:id', deleteRecipe);

export default router;

import express from 'express';
import { getRecipes, createRecipe } from './recipes.controller';

const router = express.Router();

router.get('/recipes', getRecipes);
router.post('/recipes', createRecipe);

export default router;

import express from 'express';
import cors from 'cors';
import recipesRoutes from './recipes.routes';
import favoritesRoutes from './favorites.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: [ 'http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use('/api', recipesRoutes);
app.use('/api', favoritesRoutes); // Adicionando rotas de favoritos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

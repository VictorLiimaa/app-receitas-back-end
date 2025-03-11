import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipesRoutes from './recipes.routes';
import favoritesRoutes from './favorites.routes';

dotenv.config();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: [ 'http://localhost:8081', 'http://192.168.1.42:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use('/api', recipesRoutes);
app.use('/api', favoritesRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

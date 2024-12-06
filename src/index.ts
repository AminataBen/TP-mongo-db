import express from 'express';
import mongoose from 'mongoose';
import { createProject } from './controllers/projectController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Exemple de route
app.post('/projects', createProject);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname')
  .then(() => {
    console.log('MongoDB connecté avec succès !');
    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB:', error);
  });

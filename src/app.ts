import express from 'express';
import bodyParser from 'body-parser';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

export default app;

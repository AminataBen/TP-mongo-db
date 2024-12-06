import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  markTaskDone,
  filterTasksByDueDate,
} from '../controllers/taskController';

const router = express.Router();

// Routes CRUD
router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

// Routes spécifiques
router.post('/:id/mark-done', markTaskDone);
router.get('/due-before', filterTasksByDueDate);

export default router;

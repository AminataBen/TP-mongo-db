import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  completeProject,
  filterProjectsByStatus,
} from '../controllers/projectController';

const router = express.Router();

// Routes CRUD
router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Routes spécifiques
router.post('/:id/complete', completeProject);
router.get('/by-status', filterProjectsByStatus);

export default router;

import { Request, Response } from 'express';
import Task from '../models/task';
import Project from '../models/project';

// Créer une tâche
export const createTask = async (req: Request, res: Response) => {
  try {
    const { projectId, title, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Le titre et le projectId sont requis.' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ message: 'Projet non trouvé.' });
    }

    const task = await Task.create({ projectId, title, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche.', error });
  }
};

// Lister toutes les tâches (filtrer par projet)
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;

    const filter = projectId ? { projectId } : {};
    const tasks = await Task.find(filter);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.', error });
  }
};

// Récupérer une tâche par ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche.', error });
  }
};

// Mettre à jour une tâche
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.', error });
  }
};

// Supprimer une tâche
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.status(200).json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.', error });
  }
};

// Marquer une tâche comme terminée
export const markTaskDone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, { done: true }, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.', error });
  }
};

// Filtrer les tâches par date limite
export const filterTasksByDueDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date || isNaN(Date.parse(date as string))) {
      return res.status(400).json({ message: 'Date invalide.' });
    }

    const tasks = await Task.find({ dueDate: { $lt: new Date(date as string) } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du filtrage des tâches.', error });
  }
};

import { Request, Response } from 'express';
import Project from '../models/project';
import Task from '../models/task';

// Créer un projet
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Vérification des données
    if (!name) {
      return res.status(400).json({ message: 'Le nom du projet est requis.' });
    }

    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du projet.', error });
  }
};

// Lister tous les projets
export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets.', error });
  }
};

// Récupérer un projet par ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du projet.', error });
  }
};

// Mettre à jour un projet
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findByIdAndUpdate(id, updates, { new: true });

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet.', error });
  }
};

// Supprimer un projet et ses tâches associées
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    // Suppression des tâches associées au projet
    await Task.deleteMany({ projectId: id });

    res.status(200).json({ message: 'Projet et ses tâches associées supprimés.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du projet.', error });
  }
};

// Marquer un projet comme complété
export const completeProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(
      id,
      { status: 'completed' },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet.', error });
  }
};

// Filtrer les projets par statut
export const filterProjectsByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    if (!['planned', 'in-progress', 'completed'].includes(status as string)) {
      return res.status(400).json({
        message: 'Statut invalide. Les statuts valides sont : planned, in-progress, completed.',
      });
    }

    const projects = await Project.find({ status });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du filtrage des projets.', error });
  }
};

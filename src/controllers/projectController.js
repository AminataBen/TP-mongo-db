"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProjectsByStatus = exports.completeProject = exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const project_1 = __importDefault(require("../models/project"));
const task_1 = __importDefault(require("../models/task"));
// Créer un projet
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Vérification des données
        if (!name) {
            return res.status(400).json({ message: 'Le nom du projet est requis.' });
        }
        const project = yield project_1.default.create({ name, description });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du projet.', error });
    }
});
exports.createProject = createProject;
// Lister tous les projets
const getAllProjects = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield project_1.default.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des projets.', error });
    }
});
exports.getAllProjects = getAllProjects;
// Récupérer un projet par ID
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du projet.', error });
    }
});
exports.getProjectById = getProjectById;
// Mettre à jour un projet
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const project = yield project_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet.', error });
    }
});
exports.updateProject = updateProject;
// Supprimer un projet et ses tâches associées
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield project_1.default.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        // Suppression des tâches associées au projet
        yield task_1.default.deleteMany({ projectId: id });
        res.status(200).json({ message: 'Projet et ses tâches associées supprimés.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du projet.', error });
    }
});
exports.deleteProject = deleteProject;
// Marquer un projet comme complété
const completeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield project_1.default.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé.' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet.', error });
    }
});
exports.completeProject = completeProject;
// Filtrer les projets par statut
const filterProjectsByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        if (!['planned', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({
                message: 'Statut invalide. Les statuts valides sont : planned, in-progress, completed.',
            });
        }
        const projects = yield project_1.default.find({ status });
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors du filtrage des projets.', error });
    }
});
exports.filterProjectsByStatus = filterProjectsByStatus;

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
exports.filterTasksByDueDate = exports.markTaskDone = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const task_1 = __importDefault(require("../models/task"));
const project_1 = __importDefault(require("../models/project"));
// Créer une tâche
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, title, dueDate } = req.body;
        if (!title || !projectId) {
            return res.status(400).json({ message: 'Le titre et le projectId sont requis.' });
        }
        const project = yield project_1.default.findById(projectId);
        if (!project) {
            return res.status(400).json({ message: 'Projet non trouvé.' });
        }
        const task = yield task_1.default.create({ projectId, title, dueDate });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la tâche.', error });
    }
});
exports.createTask = createTask;
// Lister toutes les tâches (filtrer par projet)
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.query;
        const filter = projectId ? { projectId } : {};
        const tasks = yield task_1.default.find(filter);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches.', error });
    }
});
exports.getAllTasks = getAllTasks;
// Récupérer une tâche par ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée.' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la tâche.', error });
    }
});
exports.getTaskById = getTaskById;
// Mettre à jour une tâche
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const task = yield task_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée.' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.', error });
    }
});
exports.updateTask = updateTask;
// Supprimer une tâche
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée.' });
        }
        res.status(200).json({ message: 'Tâche supprimée avec succès.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche.', error });
    }
});
exports.deleteTask = deleteTask;
// Marquer une tâche comme terminée
const markTaskDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_1.default.findByIdAndUpdate(id, { done: true }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée.' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche.', error });
    }
});
exports.markTaskDone = markTaskDone;
// Filtrer les tâches par date limite
const filterTasksByDueDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        if (!date || isNaN(Date.parse(date))) {
            return res.status(400).json({ message: 'Date invalide.' });
        }
        const tasks = yield task_1.default.find({ dueDate: { $lt: new Date(date) } });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors du filtrage des tâches.', error });
    }
});
exports.filterTasksByDueDate = filterTasksByDueDate;

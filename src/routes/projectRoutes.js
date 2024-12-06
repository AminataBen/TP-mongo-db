"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
// Routes CRUD
router.post('/', projectController_1.createProject);
router.get('/', projectController_1.getAllProjects);
router.get('/:id', projectController_1.getProjectById);
router.put('/:id', projectController_1.updateProject);
router.delete('/:id', projectController_1.deleteProject);
// Routes spécifiques
router.post('/:id/complete', projectController_1.completeProject);
router.get('/by-status', projectController_1.filterProjectsByStatus);
exports.default = router;

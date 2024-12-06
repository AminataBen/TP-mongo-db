import mongoose, { Schema, Document } from 'mongoose';

// Définition des types pour une tâche
interface ITask extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  done: boolean;
  dueDate?: Date;
}

// Schéma de la collection Tasks
const taskSchema = new Schema<ITask>(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  { versionKey: false }
);

export default mongoose.model<ITask>('Task', taskSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  status: 'planned' | 'in-progress' | 'completed';
  createdAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model<IProject>('Project', projectSchema);

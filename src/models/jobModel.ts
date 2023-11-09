import mongoose, { Schema, Document } from 'mongoose';

export interface Job extends Document {
  title: string;
  company: string;
  description: string;
  requirements: string;
  location: string;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}

const jobSchema: Schema<Job> = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const JobModel = mongoose.model<Job>('Job', jobSchema);

export default JobModel;

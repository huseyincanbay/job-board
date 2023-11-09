import mongoose, { Schema, Document } from 'mongoose';

export interface Application extends Document {
  userId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema: Schema<Application> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ApplicationModel = mongoose.model<Application>('Application', applicationSchema);

export default ApplicationModel;

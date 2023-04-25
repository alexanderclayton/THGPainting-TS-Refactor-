import mongoose, {Document, Schema, model } from 'mongoose';

interface IProject extends Document {
    description: string;
    startDate: Date;
    endDate?: Date;
    clientId: mongoose.Types.ObjectId;
    ProjectType: 'PAINTING' | 'CHRISTMAS_LIGHTS' | 'OTHER';
    paintColors?: string[];
    paid: boolean;
    paymentType?: 'CASH' | 'CHECK' | 'VENMO' | 'NONE';
    images?: string[];
}

interface ProjectDocument extends IProject, Document {}

const projectSchema: Schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: false,
      },
      clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
      },
      projectType: {
        type: String,
        enum: ['PAINTING', 'CHRISTMAS_LIGHTS', 'OTHER'],
        required: true,
      },
      paintColors: {
        type: [String],
        required: false,
      },
      paid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paymentType: {
        type: String,
        enum: ['CASH', 'CHECK', 'VENMO', 'NONE'],
        required: false,
      },
      images: {
        type: [String],
        required: false,
      }
});

const Project = model<ProjectDocument>('Project', projectSchema);

export { Project, ProjectDocument};
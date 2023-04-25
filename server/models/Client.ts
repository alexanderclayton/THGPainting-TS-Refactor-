import { Schema, Document, model } from 'mongoose';
import { ProjectDocument } from './Project';

interface IClient {
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    projects: ProjectDocument['_id'][];
}

interface ClientDocument extends IClient, Document {}

const clientSchema = new Schema<ClientDocument>({
    name: { 
        type: String, 
        required: true 
      },
      address: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        required: true 
      },
      phoneNumber: { 
        type: String, 
        required: true 
      },
      projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }], 
});

const Client = model<ClientDocument>('Client', clientSchema);

export { Client, ClientDocument };
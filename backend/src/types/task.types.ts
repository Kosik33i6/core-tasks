import { Document } from 'mongoose';

export interface ITaskModel extends Document {
  name: string;
  description: string;
  image: string;
  repositoryLink: string;
}
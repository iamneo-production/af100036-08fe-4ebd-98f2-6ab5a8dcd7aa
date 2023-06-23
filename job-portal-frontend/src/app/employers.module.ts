import { Job } from "./job.module";


export interface Employer {
  id: number;
  name: string;
  description: string;
  location: string;
  jobs: Job[];
  user: any;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
  
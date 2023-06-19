import{Job} from './Job.module'

export interface JobSeeker {
  id: number;
  name: string;
  skills: string[];
  experience: number;
  location: string;
  jobsApplied: Job[];
  user: any;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

  
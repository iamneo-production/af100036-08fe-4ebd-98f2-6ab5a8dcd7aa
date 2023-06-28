import{Employer} from './Employer.module'
export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: number;
  requirements: string;
  jobType: string;
  employer: Employer;
  candidates: any[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean; }

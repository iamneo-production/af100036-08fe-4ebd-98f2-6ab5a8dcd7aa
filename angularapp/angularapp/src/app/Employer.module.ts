
import{Job} from './Job.module'

export interface Employer {
  id: number;
  name: string;
  description: string;
  location: string;
  dob:string;
  email:string;
  gender:string;
  jobs: Job[];
  user: any;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
  
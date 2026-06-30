import type {job} from "./job";
interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  jobs: job[];
}
export type { Company };
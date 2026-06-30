import axios from 'axios';
import type { Job } from '../types/job';

const API_BASE_URL = 'https://localhost:8000';

export async function getJobsByCompanyId(companyId: string): Promise<Job[]> {
    const response = await axios.get(`${API_BASE_URL}/companies/${companyId}/jobs`);
    return response.data;
}
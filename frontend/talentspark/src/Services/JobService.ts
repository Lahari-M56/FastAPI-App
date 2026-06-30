import axios from 'axios';
import type { job } from '../types/job';

const API_BASE_URL = 'https://localhost:8000';

export async function getJobsByCompanyId(companyId: string): Promise<job[]> {
    const response = await axios.get(`${API_BASE_URL}/companies/${companyId}/jobs`);
    return response.data;
}
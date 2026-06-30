import axios from 'axios';
import type { Company } from '../types/company';

const API_BASE_URL = 'https://localhost:8000'; 

export async function getCompanyById(): Promise<Company[]> {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    return response.data ;
  }
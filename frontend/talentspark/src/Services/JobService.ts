import axios from "axios";
import type { Job } from "../types/job";
import { getToken } from "./AuthService";

const API_BASE_URL = "http://localhost:8000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function getJobs(): Promise<Job[]> {
  const response = await api.get("/job/");
  return response.data;
}

export async function getJob(id: number): Promise<Job> {
  const response = await api.get(`/job/${id}`);
  return response.data;
}

export async function createJob(job: Job): Promise<Job> {
  const response = await api.post("/job/", job);
  return response.data;
}

export async function updateJob(id: number, job: Job): Promise<Job> {
  const response = await api.put(`/job/${id}`, job);
  return response.data;
}

export async function deleteJob(id: number): Promise<void> {
  await api.delete(`/job/${id}`);
}
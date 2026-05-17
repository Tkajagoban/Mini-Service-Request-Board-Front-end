import { CreateJobPayload, JobRequest, JobStatus } from "@/types/job";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const jsonOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || response.statusText || "API request failed");
  }
  const json = await response.json();
  if (json && json.data !== undefined) {
    return json.data;
  }
  return json;
}

export async function fetchJobs(category?: string, status?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (status) params.set("status", status);

  const res = await fetch(`${API_BASE}/api/jobs?${params.toString()}`, {
    ...jsonOptions,
    cache: "no-store",
  });

  return handleResponse<JobRequest[]>(res);
}

export async function fetchJob(id: string) {
  const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
    ...jsonOptions,
    cache: "no-store",
  });
  return handleResponse<JobRequest>(res);
}

export async function createJob(payload: CreateJobPayload) {
  const res = await fetch(`${API_BASE}/api/jobs`, {
    method: "POST",
    ...jsonOptions,
    body: JSON.stringify(payload),
  });
  return handleResponse<JobRequest>(res);
}

export async function updateJobStatus(id: string, status: JobStatus) {
  const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
    method: "PATCH",
    ...jsonOptions,
    body: JSON.stringify({ status }),
  });
  return handleResponse<JobRequest>(res);
}

export async function deleteJob(id: string) {
  const res = await fetch(`${API_BASE}/api/jobs/${id}`, {
    method: "DELETE",
    ...jsonOptions,
  });
  return handleResponse<{ message: string }>(res);
}

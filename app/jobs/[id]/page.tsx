"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchJob, updateJobStatus, deleteJob } from "@/lib/api";
import { JobRequest, JobStatus } from "@/types/job";
import JobDetailView from "@/components/organisms/JobDetailView";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [job, setJob] = useState<JobRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchJob(id)
      .then(setJob)
      .catch((err) => setError(err.message || "Could not load job"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusChange(status: JobStatus) {
    if (!id) return;
    setSaving(true);
    try {
      const updated = await updateJobStatus(id, status);
      setJob(updated);
    } catch (err) {
      setError((err as Error)?.message || "Failed to update status");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    setSaving(true);
    try {
      await deleteJob(id);
      router.push("/");
    } catch (err) {
      setError((err as Error)?.message || "Failed to delete job");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-shell space-y-16">
      <div className="hero-bar">
        <div className="hero-copy">
          <p className="eyebrow">Request Details</p>
          <h1 className="hero-heading">View and manage this service request</h1>
        </div>
        <Link href="/" className="back-link">
          ← Back to dashboard
        </Link>
      </div>

      {error ? <div className="alert">{error}</div> : null}

      <div className="card">
        <JobDetailView
          job={job}
          loading={loading}
          saving={saving}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createJob } from "@/lib/api";
import { CreateJobPayload } from "@/types/job";
import JobForm from "@/components/molecules/JobForm";

const initialValues: CreateJobPayload = {
  title: "",
  description: "",
  category: "Plumbing",
  location: "",
  contactName: "",
  contactEmail: "",
};

export default function NewJobPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(values: CreateJobPayload) {
    setError(null);
    setIsSaving(true);
    try {
      await createJob(values);
      router.push("/");
    } catch (err) {
      setError((err as Error)?.message || "Failed to create job request");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="page-shell space-y-16" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
      <div className="hero-bar" style={{ display: 'block', marginBottom: '32px' }}>
        <Link href="/" className="back-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8', fontWeight: 'bold', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '24px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to dashboard
        </Link>
        <div className="hero-copy">
          <h1 className="hero-heading" style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1f2937' }}>Create New Service Request</h1>
          <p className="hero-subtitle" style={{ fontSize: '1.1rem', margin: 0, color: '#6b7280' }}>Fill in the details below to post your service request</p>
        </div>
      </div>

      <div className="card" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <JobForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          disabled={isSaving}
        />
        {error ? <p className="field-error">{error}</p> : null}
      </div>
    </div>
  );
}

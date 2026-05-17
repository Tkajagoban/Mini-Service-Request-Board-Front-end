"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchJobs } from "@/lib/api";
import { JobRequest } from "@/types/job";
import JobList from "@/components/organisms/JobList";
import FilterBar from "@/components/molecules/FilterBar";

const categories = ["All", "Plumbing", "Electrical", "Painting", "Joinery"];
const statuses = ["All", "Open", "In Progress", "Closed"];

export default function HomePage() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeCategory = category === "All" ? undefined : category;
  const activeStatus = status === "All" ? undefined : status;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchJobs(activeCategory, activeStatus)
      .then(setJobs)
      .catch((err) => setError(err.message || "Failed to load jobs"))
      .finally(() => setLoading(false));
  }, [activeCategory, activeStatus]);

  const heading = useMemo(() => {
    if (category !== "All") {
      return `${category} Requests`;
    }
    if (status !== "All") {
      return `${status} Requests`;
    }
    return "Open Service Requests";
  }, [category, status]);

  return (
    <div className="page-shell space-y-16">
      <section className="hero-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div className="hero-copy" style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: 'none' }}>
          <div style={{ color: '#1d4ed8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z"/>
            </svg>
          </div>
          <div>
            <h1 className="hero-heading" style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Service Request Board</h1>
            <p className="hero-subtitle" style={{ fontSize: '1.1rem', marginTop: '4px', margin: 0, color: '#6b7280' }}>
              Browse and manage service requests from homeowners
            </p>
          </div>
        </div>
        <Link href="/new" className="btn">
          + New Request
        </Link>
      </section>

      <section className="panel" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #e5e7eb', borderRadius: 0, padding: '0 0 32px 0', marginBottom: '32px', boxShadow: 'none' }}>
        <div className="section-heading" style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px' }}>Filter Requests</div>
        <div className="filter-panel" style={{ display: 'flex', gap: '16px' }}>
          <FilterBar
            category={category}
            status={status}
            categories={categories}
            statuses={statuses}
            onCategoryChange={setCategory}
            onStatusChange={setStatus}
          />
        </div>
      </section>

      {error ? (
        <div className="alert">{error}</div>
      ) : (
        <JobList jobs={jobs} loading={loading} heading={heading} />
      )}
    </div>
  );
}

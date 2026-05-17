import Link from "next/link";
import { JobRequest } from "@/types/job";
import JobCard from "@/components/molecules/JobCard";

interface JobListProps {
  jobs: JobRequest[];
  loading: boolean;
  heading: string;
}

export default function JobList({ jobs, loading, heading }: JobListProps) {
  if (loading) {
    return <p>Loading requests…</p>;
  }

  if (jobs.length === 0) {
    return (
      <div className="card">
        <h3 className="section-heading">{heading}</h3>
        <p className="text-muted">No service requests match this filter yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="section-heading">{jobs.length} Requests Found</div>
      <div className="job-card-grid grid-2">
        {jobs.map((job) => (
          <Link key={job._id} href={`/jobs/${job._id}`}>
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
}

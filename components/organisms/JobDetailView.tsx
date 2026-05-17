import { JobRequest, JobStatus } from "@/types/job";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

interface JobDetailViewProps {
  job: JobRequest | null;
  loading: boolean;
  saving: boolean;
  onStatusChange: (status: JobStatus) => Promise<void>;
  onDelete: () => Promise<void>;
}

const statusOptions: JobStatus[] = ["Open", "In Progress", "Closed"];

function badgeClass(status: JobStatus) {
  if (status === "Open") return "badge badge-open";
  if (status === "In Progress") return "badge badge-progress";
  return "badge badge-closed";
}

export default function JobDetailView({ job, loading, saving, onStatusChange, onDelete }: JobDetailViewProps) {
  if (loading) {
    return <p>Loading request details…</p>;
  }

  if (!job) {
    return <p className="text-muted">Job request not found.</p>;
  }

  return (
    <div className="job-detail-grid">
      <div>
        <div className="status-row">
          <span className={badgeClass(job.status)}>{job.status}</span>
          <span className="text-small">Created {new Date(job.createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="job-card-title" style={{ marginTop: 18 }}>{job.title}</h2>
        <p className="text-muted" style={{ marginTop: 14 }}>{job.location} • {job.category}</p>

        <div className="meta-row" style={{ marginTop: 24 }}>
          <div className="meta-card">👤 {job.contactName || "Unknown"}</div>
          <div className="meta-card">✉️ {job.contactEmail}</div>
          <div className="meta-card">📍 {job.location}</div>
        </div>

        <div style={{ marginTop: 24 }}>
          <h3 className="section-heading">Request description</h3>
          <p style={{ lineHeight: 1.8, color: "#334155" }}>{job.description}</p>
        </div>
      </div>

      <div className="card">
        <div className="space-y-16">
          <div className="form-field">
            <label htmlFor="status">Change request status</label>
            <Select
              id="status"
              options={statusOptions}
              value={job.status}
              onChange={(event) => onStatusChange(event.target.value as JobStatus)}
              disabled={saving}
            />
          </div>

          <div className="status-row" style={{ justifyContent: "space-between" }}>
            <Button type="button" disabled={saving} onClick={() => onDelete()}>
              Delete request
            </Button>
            <span className="text-small text-muted">
              Changes are saved immediately.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

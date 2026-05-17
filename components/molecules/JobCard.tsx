import { JobRequest } from "@/types/job";

function statusBadge(status: string) {
  if (status === "Open") return "badge badge-open";
  if (status === "In Progress") return "badge badge-progress";
  return "badge badge-closed";
}

function categoryChip(category: string) {
  const output = category.toLowerCase();
  return `chip chip-${output}`;
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? "about 1 year ago" : `about ${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? "about 1 month ago" : `about ${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 day ago" : `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 hour ago" : `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1 ? "1 minute ago" : `${Math.floor(interval)} minutes ago`;
  }
  return "just now";
}

export default function JobCard({ job }: { job: JobRequest }) {
  return (
    <article className="job-card" style={{ display: 'flex', flexDirection: 'column', padding: '24px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div className="job-card-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span className={categoryChip(job.category)}>{job.category}</span>
        <span className={statusBadge(job.status)}>{job.status}</span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 className="job-card-title" style={{ fontSize: '1.25rem', margin: '0 0 8px 0', color: '#1f2937' }}>{job.title}</h3>
        <p className="text-muted" style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5' }}>{job.description}</p>
      </div>

      <div className="job-card-meta" style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#6b7280', fontSize: '0.9rem', marginBottom: '24px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {job.location}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          {job.contactName || "Unknown"}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          {timeAgo(job.createdAt)}
        </span>
      </div>

      <div className="job-card-footer" style={{ marginTop: 'auto' }}>
        <button className="view-details-btn btn" style={{ width: '100%', padding: '10px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>View Details</button>
      </div>
    </article>
  );
}

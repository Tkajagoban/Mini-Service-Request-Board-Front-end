import { ChangeEvent } from "react";

interface FilterBarProps {
  category: string;
  status: string;
  categories: string[];
  statuses: string[];
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function FilterBar({
  category,
  status,
  categories,
  statuses,
  onCategoryChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <>
      <div className="form-field" style={{ minWidth: '200px' }}>
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%' }}>
          <legend style={{ fontSize: '0.8rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Category</legend>
          <select
            id="category"
            className="select-bare"
            value={category}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              onCategoryChange(event.target.value)
            }
            style={{ border: 'none', background: 'transparent', padding: '4px 4px 8px 4px', width: '100%', outline: 'none', fontSize: '1rem', color: '#1f2937' }}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </fieldset>
      </div>

      <div className="form-field" style={{ minWidth: '200px' }}>
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%' }}>
          <legend style={{ fontSize: '0.8rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Status</legend>
          <select
            id="status"
            className="select-bare"
            value={status}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              onStatusChange(event.target.value)
            }
            style={{ border: 'none', background: 'transparent', padding: '4px 4px 8px 4px', width: '100%', outline: 'none', fontSize: '1rem', color: '#1f2937' }}
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Statuses" : item}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
    </>
  );
}

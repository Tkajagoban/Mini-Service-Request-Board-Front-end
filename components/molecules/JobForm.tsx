import { FormEvent, useMemo, useState } from "react";
import { CreateJobPayload } from "@/types/job";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import TextArea from "@/components/atoms/TextArea";

interface JobFormProps {
  initialValues: CreateJobPayload;
  onSubmit: (values: CreateJobPayload) => Promise<void>;
  disabled?: boolean;
}

const categoryOptions = ["Plumbing", "Electrical", "Painting", "Joinery"];

export default function JobForm({ initialValues, onSubmit, disabled }: JobFormProps) {
  const [values, setValues] = useState<CreateJobPayload>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateJobPayload, string>>>({});

  const canSubmit = useMemo(
    () =>
      values.title.trim() &&
      values.description.trim() &&
      values.location.trim() &&
      values.contactEmail.trim(),
    [values]
  );

  function handleChange(field: keyof CreateJobPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof CreateJobPayload, string>> = {};
    if (!values.title.trim()) next.title = "Title is required.";
    if (!values.description.trim()) next.description = "Description is required.";
    if (!values.location.trim()) next.location = "Location is required.";
    if (!values.contactEmail.trim()) {
      next.contactEmail = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contactEmail)) {
      next.contactEmail = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="form-field">
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%', background: '#fff' }}>
          <legend style={{ fontSize: '0.85rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Title</legend>
          <Input
            id="title"
            value={values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            disabled={disabled}
            style={{ width: '100%', padding: '4px 8px 8px 8px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#1f2937' }}
          />
        </fieldset>
        {errors.title ? <span className="field-error" style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.title}</span> : null}
      </div>

      <div className="form-field">
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%', background: '#fff' }}>
          <legend style={{ fontSize: '0.85rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Description</legend>
          <TextArea
            id="description"
            value={values.description}
            onChange={(event) => handleChange("description", event.target.value)}
            rows={5}
            disabled={disabled}
            style={{ width: '100%', padding: '4px 8px 8px 8px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#1f2937', fontFamily: 'inherit', resize: 'vertical' }}
          />
        </fieldset>
        {errors.description ? <span className="field-error" style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.description}</span> : null}
      </div>

      <div className="form-field">
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%', background: '#fff' }}>
          <legend style={{ fontSize: '0.85rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Category</legend>
          <Select
            id="category"
            value={values.category}
            onChange={(event) => handleChange("category", event.target.value)}
            options={categoryOptions}
            disabled={disabled}
            style={{ width: '100%', padding: '4px 8px 8px 8px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#1f2937' }}
          />
        </fieldset>
      </div>

      <div className="form-field">
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%', background: '#fff' }}>
          <legend style={{ fontSize: '0.85rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Location</legend>
          <Input
            id="location"
            value={values.location}
            onChange={(event) => handleChange("location", event.target.value)}
            disabled={disabled}
            style={{ width: '100%', padding: '4px 8px 8px 8px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#1f2937' }}
          />
        </fieldset>
        {errors.location ? <span className="field-error" style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.location}</span> : null}
      </div>

      <div className="form-field">
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%', background: '#fff' }}>
          <legend style={{ fontSize: '0.85rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Contact Name</legend>
          <Input
            id="contactName"
            value={values.contactName}
            onChange={(event) => handleChange("contactName", event.target.value)}
            disabled={disabled}
            style={{ width: '100%', padding: '4px 8px 8px 8px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#1f2937' }}
          />
        </fieldset>
      </div>

      <div className="form-field">
        <fieldset style={{ border: '1px solid #d1d5db', borderRadius: '4px', padding: '0 8px', margin: 0, width: '100%', background: '#fff' }}>
          <legend style={{ fontSize: '0.85rem', color: '#6b7280', padding: '0 4px', margin: 0 }}>Contact Email</legend>
          <Input
            id="contactEmail"
            type="email"
            value={values.contactEmail}
            onChange={(event) => handleChange("contactEmail", event.target.value)}
            disabled={disabled}
            style={{ width: '100%', padding: '4px 8px 8px 8px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: '#1f2937' }}
          />
        </fieldset>
        {errors.contactEmail ? <span className="field-error" style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '4px', display: 'block' }}>{errors.contactEmail}</span> : null}
      </div>

      <div style={{ marginTop: '32px' }}>
        <button type="submit" disabled={disabled || !canSubmit} className="btn" style={{ padding: '14px 24px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
          Create request
        </button>
      </div>
    </form>
  );
}

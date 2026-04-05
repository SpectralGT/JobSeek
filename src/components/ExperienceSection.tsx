import type { ExperienceEntry } from '../types/userData'
import { TagInput } from './TagInput'

interface Props {
  value: ExperienceEntry[];
  onChange: (v: ExperienceEntry[]) => void;
}

function emptyEntry(): ExperienceEntry {
  return {
    companyName: '',
    role: '',
    start: '',
    end: '',
    city: '',
    state: '',
    work: [],
  };
}

export function ExperienceSection({ value, onChange }: Props) {
  const update = (index: number, entry: ExperienceEntry) => {
    const next = [...value];
    next[index] = entry;
    onChange(next);
  };

  const addEntry = () => onChange([...value, emptyEntry()]);
  const removeEntry = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <section className="section">
      <h2>Experience</h2>
      {value.map((entry, i) => (
        <div key={i} className="list-item">
          <h3>Experience #{i + 1}</h3>
          <div className="grid-2">
            <div>
              <label className="field-label">Company name</label>
              <input
                type="text"
                value={entry.companyName}
                onChange={(e) => update(i, { ...entry, companyName: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">Role</label>
              <input
                type="text"
                value={entry.role}
                onChange={(e) => update(i, { ...entry, role: e.target.value })}
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <label className="field-label">Start (YYYY-MM)</label>
              <input
                type="text"
                value={entry.start}
                onChange={(e) => update(i, { ...entry, start: e.target.value })}
                placeholder="2020-07"
              />
            </div>
            <div>
              <label className="field-label">End</label>
              <input
                type="text"
                value={entry.end}
                onChange={(e) => update(i, { ...entry, end: e.target.value })}
                placeholder="2023-06 or present"
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <label className="field-label">City</label>
              <input
                type="text"
                value={entry.city}
                onChange={(e) => update(i, { ...entry, city: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">State</label>
              <input
                type="text"
                value={entry.state}
                onChange={(e) => update(i, { ...entry, state: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <TagInput
              label="Work / bullet points (add one by one)"
              placeholder="e.g. Led backend architecture..."
              value={entry.work}
              onChange={(work) => update(i, { ...entry, work })}
            />
          </div>
          <button type="button" className="btn btn-danger btn-sm add-btn" onClick={() => removeEntry(i)}>
            Remove this experience
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-ghost add-btn" onClick={addEntry}>
        + Add experience
      </button>
    </section>
  );
}

import type { ProjectEntry } from '../types/userData'
import { TagInput } from './TagInput'

interface Props {
  value: ProjectEntry[];
  onChange: (v: ProjectEntry[]) => void;
}

function emptyEntry(): ProjectEntry {
  return { name: '', stack: [], month: '', year: '' };
}

export function ProjectsSection({ value, onChange }: Props) {
  const update = (index: number, entry: ProjectEntry) => {
    const next = [...value];
    next[index] = entry;
    onChange(next);
  };

  const addEntry = () => onChange([...value, emptyEntry()]);
  const removeEntry = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <section className="section">
      <h2>Projects</h2>
      {value.map((entry, i) => (
        <div key={i} className="list-item">
          <h3>Project #{i + 1}</h3>
          <div className="grid-2 full">
            <div>
              <label className="field-label">Project name</label>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => update(i, { ...entry, name: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TagInput
              label="Stack (add one by one)"
              placeholder="e.g. React"
              value={entry.stack}
              onChange={(stack) => update(i, { ...entry, stack })}
            />
          </div>
          <div className="grid-2">
            <div>
              <label className="field-label">Month (MM)</label>
              <input
                type="text"
                value={entry.month}
                onChange={(e) => update(i, { ...entry, month: e.target.value })}
                placeholder="02"
                maxLength={2}
              />
            </div>
            <div>
              <label className="field-label">Year (YYYY)</label>
              <input
                type="text"
                value={entry.year}
                onChange={(e) => update(i, { ...entry, year: e.target.value })}
                placeholder="2024"
                maxLength={4}
              />
            </div>
          </div>
          <button type="button" className="btn btn-danger btn-sm add-btn" onClick={() => removeEntry(i)}>
            Remove this project
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-ghost add-btn" onClick={addEntry}>
        + Add project
      </button>
    </section>
  );
}

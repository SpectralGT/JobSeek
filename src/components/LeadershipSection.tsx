import type { LeadershipEntry } from '../types/userData'
import { TagInput } from './TagInput'

interface Props {
  value: LeadershipEntry[];
  onChange: (v: LeadershipEntry[]) => void;
}

function emptyEntry(): LeadershipEntry {
  return { organisationName: '', work: [] };
}

export function LeadershipSection({ value, onChange }: Props) {
  const update = (index: number, entry: LeadershipEntry) => {
    const next = [...value];
    next[index] = entry;
    onChange(next);
  };

  const addEntry = () => onChange([...value, emptyEntry()]);
  const removeEntry = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <section className="section">
      <h2>Leadership</h2>
      {value.map((entry, i) => (
        <div key={i} className="list-item">
          <h3>Leadership #{i + 1}</h3>
          <div className="grid-2 full">
            <div>
              <label className="field-label">Organisation name</label>
              <input
                type="text"
                value={entry.organisationName}
                onChange={(e) => update(i, { ...entry, organisationName: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <TagInput
              label="Work / bullet points (add one by one)"
              placeholder="e.g. Organized monthly speaker sessions"
              value={entry.work}
              onChange={(work) => update(i, { ...entry, work })}
            />
          </div>
          <button type="button" className="btn btn-danger btn-sm add-btn" onClick={() => removeEntry(i)}>
            Remove this entry
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-ghost add-btn" onClick={addEntry}>
        + Add leadership
      </button>
    </section>
  );
}

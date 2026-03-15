import type { ProjectEntry } from '../types/userData'

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

  const setStack = (index: number, raw: string) => {
    const entry = value[index];
    const stack = raw ? raw.split(',').map((s) => s.trim()).filter(Boolean) : [];
    update(index, { ...entry, stack });
  };

  const addEntry = () => onChange([...value, emptyEntry()]);
  const removeEntry = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <section className="section">
      <h2>Projects</h2>
      {value.map((entry, i) => (
        <div key={i} className="list-item">
          <h3>Project #{i + 1}</h3>
          <div className="grid-2">
            <div>
              <label className="field-label">Project name</label>
              <input
                type="text"
                value={entry.name}
                onChange={(e) => update(i, { ...entry, name: e.target.value })}
              />
            </div>
            <div>
              <label className="field-label">Stack (comma-separated)</label>
              <input
                type="text"
                value={entry.stack.join(', ')}
                onChange={(e) => setStack(i, e.target.value)}
                placeholder="React, TypeScript, Node.js"
              />
            </div>
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

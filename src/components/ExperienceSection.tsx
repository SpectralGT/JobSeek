import type { ExperienceEntry } from '../types/userData'

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
    work: [''],
  };
}

export function ExperienceSection({ value, onChange }: Props) {
  const update = (index: number, entry: ExperienceEntry) => {
    const next = [...value];
    next[index] = entry;
    onChange(next);
  };

  const addWork = (entryIndex: number) => {
    const entry = value[entryIndex];
    update(entryIndex, { ...entry, work: [...entry.work, ''] });
  };

  const updateWork = (entryIndex: number, workIndex: number, val: string) => {
    const entry = value[entryIndex];
    const next = [...entry.work];
    next[workIndex] = val;
    update(entryIndex, { ...entry, work: next });
  };

  const removeWork = (entryIndex: number, workIndex: number) => {
    const entry = value[entryIndex];
    if (entry.work.length <= 1) return;
    const next = entry.work.filter((_, i) => i !== workIndex);
    update(entryIndex, { ...entry, work: next });
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
          <label className="field-label" style={{ marginTop: '0.75rem' }}>
            Work / bullet points
          </label>
          {entry.work.map((item, j) => (
            <div key={j} className="array-row">
              <input
                type="text"
                value={item}
                onChange={(e) => updateWork(i, j, e.target.value)}
                placeholder="e.g. Led backend architecture..."
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm remove-item"
                onClick={() => removeWork(i, j)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-ghost btn-sm add-btn" onClick={() => addWork(i)}>
            + Add bullet
          </button>
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

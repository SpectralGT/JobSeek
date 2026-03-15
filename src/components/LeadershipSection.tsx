import type { LeadershipEntry } from '../types/userData'

interface Props {
  value: LeadershipEntry[];
  onChange: (v: LeadershipEntry[]) => void;
}

function emptyEntry(): LeadershipEntry {
  return { organisationName: '', work: [''] };
}

export function LeadershipSection({ value, onChange }: Props) {
  const update = (index: number, entry: LeadershipEntry) => {
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
          <label className="field-label" style={{ marginTop: '0.75rem' }}>
            Work / bullet points
          </label>
          {entry.work.map((item, j) => (
            <div key={j} className="array-row">
              <input
                type="text"
                value={item}
                onChange={(e) => updateWork(i, j, e.target.value)}
                placeholder="e.g. Organized monthly speaker sessions"
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

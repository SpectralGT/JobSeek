import type { EducationEntry, CourseType } from '../types/userData'
import { TagInput } from './TagInput'

interface Props {
  value: EducationEntry[];
  onChange: (v: EducationEntry[]) => void;
}

const COURSE_TYPES: { value: CourseType; label: string }[] = [
  { value: '', label: '—' },
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Masters' },
  { value: 'phd', label: 'PhD' },
  { value: 'associate', label: 'Associate' },
  { value: 'certificate', label: 'Certificate' },
];

function emptyEntry(): EducationEntry {
  return {
    university: '',
    start: '',
    end: '',
    city: '',
    state: '',
    courseType: '',
    courseName: '',
    coursework: [],
  };
}

export function EducationSection({ value, onChange }: Props) {
  const update = (index: number, entry: EducationEntry) => {
    const next = [...value];
    next[index] = entry;
    onChange(next);
  };

  const addEntry = () => onChange([...value, emptyEntry()]);
  const removeEntry = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <section className="section">
      <h2>Education</h2>
      {value.map((entry, i) => (
        <div key={i} className="list-item">
          <h3>Education #{i + 1}</h3>
          <div className="grid-2 full">
            <div>
              <label className="field-label">University</label>
              <input
                type="text"
                value={entry.university}
                onChange={(e) => update(i, { ...entry, university: e.target.value })}
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
                placeholder="2016-08"
              />
            </div>
            <div>
              <label className="field-label">End (YYYY-MM)</label>
              <input
                type="text"
                value={entry.end}
                onChange={(e) => update(i, { ...entry, end: e.target.value })}
                placeholder="2020-05"
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
          <div className="grid-2">
            <div>
              <label className="field-label">Course type</label>
              <select
                value={entry.courseType}
                onChange={(e) => update(i, { ...entry, courseType: e.target.value })}
              >
                {COURSE_TYPES.map((o) => (
                  <option key={o.value || 'empty'} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Course name</label>
              <input
                type="text"
                value={entry.courseName}
                onChange={(e) => update(i, { ...entry, courseName: e.target.value })}
                placeholder="e.g. Computer Science"
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <TagInput
              label="Coursework (add one by one)"
              placeholder="e.g. Data Structures"
              value={entry.coursework}
              onChange={(coursework) => update(i, { ...entry, coursework })}
            />
          </div>
          <button type="button" className="btn btn-danger btn-sm add-btn" onClick={() => removeEntry(i)}>
            Remove this education
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-ghost add-btn" onClick={addEntry}>
        + Add education
      </button>
    </section>
  );
}

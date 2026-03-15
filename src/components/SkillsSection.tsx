import type { Skills } from '../types/userData'
import { TagInput } from './TagInput'

interface Props {
  value: Skills;
  onChange: (v: Skills) => void;
}

export function SkillsSection({ value, onChange }: Props) {
  return (
    <section className="section">
      <h2>Skills</h2>
      <div className="grid-2">
        <TagInput
          label="Languages (add one by one)"
          placeholder="e.g. JavaScript"
          value={value.languages}
          onChange={(languages) => onChange({ ...value, languages })}
        />
        <TagInput
          label="Tools"
          placeholder="e.g. Git"
          value={value.tools}
          onChange={(tools) => onChange({ ...value, tools })}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <TagInput
          label="More (frameworks, etc.)"
          placeholder="e.g. React"
          value={value.more}
          onChange={(more) => onChange({ ...value, more })}
        />
      </div>
    </section>
  );
}

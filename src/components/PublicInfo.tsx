import type { PublicInformation } from '../types/userData'

interface Props {
  value: PublicInformation;
  onChange: (v: PublicInformation) => void;
}

export function PublicInfo({ value, onChange }: Props) {
  const update = (key: keyof PublicInformation, val: string) => {
    onChange({ ...value, [key]: val });
  };
  return (
    <section className="section">
      <h2>Public Information</h2>
      <div className="grid-2">
        <div>
          <label className="field-label">Phone</label>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
        <div>
          <label className="field-label">Email</label>
          <input
            type="email"
            value={value.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
      </div>
      <div className="grid-2">
        <div>
          <label className="field-label">LinkedIn</label>
          <input
            type="url"
            value={value.linkedin}
            onChange={(e) => update('linkedin', e.target.value)}
            placeholder="https://"
          />
        </div>
        <div>
          <label className="field-label">GitHub</label>
          <input
            type="url"
            value={value.github}
            onChange={(e) => update('github', e.target.value)}
            placeholder="https://"
          />
        </div>
      </div>
    </section>
  );
}

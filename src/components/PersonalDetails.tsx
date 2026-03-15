import type { PersonalDetails as PersonalDetailsType } from '../types/userData'

interface Props {
  value: PersonalDetailsType;
  onChange: (v: PersonalDetailsType) => void;
}

export function PersonalDetails({ value, onChange }: Props) {
  const update = (key: keyof PersonalDetailsType, val: string) => {
    onChange({ ...value, [key]: val });
  };
  return (
    <section className="section">
      <h2>Personal Details</h2>
      <div className="grid-2">
        <div className="full">
          <label className="field-label">Name</label>
          <input
            type="text"
            value={value.Name}
            onChange={(e) => update('Name', e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid-2">
        <div className="full">
          <label className="field-label">Street</label>
          <input
            type="text"
            value={value.Street}
            onChange={(e) => update('Street', e.target.value)}
          />
        </div>
      </div>
      <div className="grid-2">
        <div>
          <label className="field-label">Town</label>
          <input
            type="text"
            value={value.Town}
            onChange={(e) => update('Town', e.target.value)}
          />
        </div>
        <div>
          <label className="field-label">State</label>
          <input
            type="text"
            value={value.State}
            onChange={(e) => update('State', e.target.value)}
          />
        </div>
      </div>
      <div className="grid-2">
        <div>
          <label className="field-label">Zipcode</label>
          <input
            type="text"
            value={value.Zipcode}
            onChange={(e) => update('Zipcode', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

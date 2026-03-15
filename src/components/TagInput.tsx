import { useState, KeyboardEvent } from 'react'

interface Props {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function TagInput({ label, placeholder = 'e.g. JavaScript', value, onChange }: Props) {
  const [input, setInput] = useState('');

  const add = (raw: string) => {
    const v = raw.trim();
    if (!v || value.includes(v)) return;
    onChange([...value, v]);
    setInput('');
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(input);
    }
  };

  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="tag-list">
        {value.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
            <button type="button" onClick={() => remove(i)} aria-label="Remove">
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="new-tag"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => add(input)}
        />
      </div>
    </div>
  );
}

interface Props {
  jsonString: string;
  onGenerate: () => void;
}

export function JsonOutput({ jsonString, onGenerate }: Props) {
  const copy = () => {
    if (!jsonString) {
      alert('Generate JSON first.');
      return;
    }
    navigator.clipboard.writeText(jsonString).then(() => alert('Copied to clipboard.'));
  };

  const download = () => {
    if (!jsonString) {
      alert('Generate JSON first.');
      return;
    }
    const blob = new Blob([jsonString], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'userData.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="output-section">
      <h2>JSON Output</h2>
      <div className="output-actions">
        <button type="button" className="btn btn-primary" onClick={onGenerate}>
          Generate JSON
        </button>
        <button type="button" className="btn btn-ghost" onClick={copy}>
          Copy to clipboard
        </button>
        <button type="button" className="btn btn-ghost" onClick={download}>
          Download userData.json
        </button>
      </div>
      <textarea
        className="json-output"
        readOnly
        value={jsonString}
        placeholder="Click 'Generate JSON' to build output from the form."
      />
    </div>
  );
}

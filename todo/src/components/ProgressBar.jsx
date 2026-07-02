export default function ProgressBar({ done, total }) {
  if (total === 0) return null;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="progress-wrap">
      <div className="progress-row">
        <span>
          {done} / {total} 完了
        </span>
        <span>{pct}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

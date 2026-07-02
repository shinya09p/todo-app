export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder="タスクを検索..."
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

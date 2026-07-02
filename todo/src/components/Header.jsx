export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="app-header">
      <div className="logo">
        <div className="logo-icon">✓</div>
        <h1>TODO</h1>
      </div>
      <button
        className="theme-btn"
        onClick={onToggleTheme}
        title="テーマ切替"
      >
        {theme === 'dark' ? '☀' : '🌙'}
      </button>
    </header>
  );
}

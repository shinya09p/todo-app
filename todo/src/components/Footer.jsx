export default function Footer({ activeCount, hasCompleted, onClearCompleted }) {
  return (
    <div className="footer">
      <span className="count-text">{activeCount} 件の未完了</span>
      {hasCompleted && (
        <button className="clear-btn" onClick={onClearCompleted}>
          完了済みを削除
        </button>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { formatDue, isOverdue, PRIORITY_LABEL } from '../utils';

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  dragProps,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commit() {
    const v = draft.trim();
    if (v) onEdit(todo.id, v);
    else setDraft(todo.text);
    setEditing(false);
  }

  const over = !todo.done && isOverdue(todo.due);
  const hasMeta = (todo.priority && todo.priority !== 'none') || todo.due;

  return (
    <div
      className={`todo-item ${todo.priority !== 'none' ? `priority-${todo.priority}` : ''} ${dragProps.isDragging ? 'dragging' : ''} ${dragProps.isDragOver ? 'drag-over' : ''}`}
      draggable
      onDragStart={dragProps.onDragStart}
      onDragEnd={dragProps.onDragEnd}
      onDragOver={dragProps.onDragOver}
      onDrop={dragProps.onDrop}
    >
      <div
        className={`check-box ${todo.done ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
      />
      <div className="todo-content">
        {editing ? (
          <input
            ref={inputRef}
            className="todo-edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') {
                setDraft(todo.text);
                setEditing(false);
              }
            }}
          />
        ) : (
          <div
            className={`todo-text ${todo.done ? 'done' : ''}`}
            onDoubleClick={() => setEditing(true)}
          >
            {todo.text}
          </div>
        )}
        {hasMeta && (
          <div className="todo-meta">
            {todo.priority && todo.priority !== 'none' && (
              <span className={`priority-tag ${todo.priority}`}>
                {PRIORITY_LABEL[todo.priority]}
              </span>
            )}
            {todo.due && (
              <span className={`due-tag ${over ? 'overdue' : ''}`}>
                📅 {formatDue(todo.due)}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="todo-actions">
        <button
          className="action-btn edit"
          title="編集"
          onClick={() => setEditing(true)}
        >
          ✏
        </button>
        <button
          className="action-btn delete"
          title="削除"
          onClick={() => onDelete(todo.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import TodoItem from './TodoItem';

const EMPTY_MESSAGES = {
  all: 'タスクを追加してみましょう',
  active: '未完了のタスクはありません！',
  completed: '完了済みのタスクはありません',
};

export default function TodoList({
  todos,
  filter,
  searchQuery,
  onToggle,
  onDelete,
  onEdit,
  onReorder,
}) {
  const [dragSrcId, setDragSrcId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="empty">
          <div className="empty-icon">📋</div>
          <div className="empty-text">
            {searchQuery ? '検索結果がありません' : EMPTY_MESSAGES[filter]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          dragProps={{
            isDragging: dragSrcId === todo.id,
            isDragOver: dragOverId === todo.id,
            onDragStart: (e) => {
              setDragSrcId(todo.id);
              e.dataTransfer.effectAllowed = 'move';
            },
            onDragEnd: () => {
              setDragSrcId(null);
              setDragOverId(null);
            },
            onDragOver: (e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              if (dragOverId !== todo.id) setDragOverId(todo.id);
            },
            onDrop: (e) => {
              e.preventDefault();
              if (dragSrcId !== null && dragSrcId !== todo.id) {
                onReorder(dragSrcId, todo.id);
              }
              setDragSrcId(null);
              setDragOverId(null);
            },
          }}
        />
      ))}
    </div>
  );
}

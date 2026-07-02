import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('none');
  const [due, setDue] = useState('');

  function submit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, priority, due: due || null });
    setText('');
    setPriority('none');
    setDue('');
  }

  return (
    <form className="input-card" onSubmit={submit}>
      <div className="input-row">
        <input
          type="text"
          className="todo-input"
          placeholder="新しいタスクを追加..."
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-btn">
          追加
        </button>
      </div>
      <div className="input-meta">
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="none">優先度なし</option>
          <option value="high">● 高</option>
          <option value="med">● 中</option>
          <option value="low">● 低</option>
        </select>
        <input
          type="date"
          className="due-input"
          title="期限日"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
    </form>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import ProgressBar from './components/ProgressBar';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos-v1', []);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function addTodo({ text, priority, due }) {
    setTodos((prev) => [
      {
        id: Date.now(),
        text,
        done: false,
        priority,
        due,
        created: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, text) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  function reorderTodo(srcId, targetId) {
    setTodos((prev) => {
      const next = [...prev];
      const srcIdx = next.findIndex((t) => t.id === srcId);
      const targetIdx = next.findIndex((t) => t.id === targetId);
      if (srcIdx === -1 || targetIdx === -1) return prev;
      const [moved] = next.splice(srcIdx, 1);
      next.splice(targetIdx, 0, moved);
      return next;
    });
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  const filteredTodos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return todos.filter((t) => {
      const matchFilter =
        filter === 'all' ||
        (filter === 'active' && !t.done) ||
        (filter === 'completed' && t.done);
      const matchQuery = !q || t.text.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [todos, filter, searchQuery]);

  const total = todos.length;
  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <TodoForm onAdd={addTodo} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FilterBar filter={filter} onChange={setFilter} />

      {total > 0 && <ProgressBar done={doneCount} total={total} />}

      <TodoList
        todos={filteredTodos}
        filter={filter}
        searchQuery={searchQuery}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onReorder={reorderTodo}
      />

      {total > 0 && (
        <Footer
          activeCount={total - doneCount}
          hasCompleted={doneCount > 0}
          onClearCompleted={clearCompleted}
        />
      )}
    </div>
  );
}

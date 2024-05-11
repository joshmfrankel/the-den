import React, { useState, MouseEvent, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Sortable from 'sortablejs';

interface Task {
  id: number,
  name: string,
  position: number,
}

export default function HomePage() {
  const navigationLinks: [string, string][] = [['boards', 'Boards'], ['tasks', 'Tasks']];
  const [todos, setTodos] = useState([
    { id: 1, name: 'First', position: 2 },
    { id: 2, name: 'Second', position: 1 },
    { id: 3, name: 'Another', position: 3 }
  ]);
  const [completed, setCompleted] = useState<Array[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task>({});

  // One way
  // https://medium.com/the-andela-way/react-drag-and-drop-7411d14894b9
  const onDrag = (event: MouseEvent, todo: Task): void => {
    event.preventDefault();
    setDraggedTask(todo);
  };

  const onDragEnd = (event: MouseEvent): void => {
    event.preventDefault();
    setDraggedTask({});
  };

  const onDragOver = (event: MouseEvent): void => {
    event.preventDefault();
  };

  const onDrop = (event: MouseEvent, lane: string): void => {
    event.preventDefault();

    if (lane === 'completed' && !completed.some(complete => complete.id === draggedTask['id'])) {
      setCompleted([...completed, draggedTask]);
      setTodos(todos.filter(task => task.id !== draggedTask['id']));
    }

    if (lane === 'todos' && !todos.some(complete => complete.id === draggedTask['id'])) {
      setTodos([...todos, draggedTask]);
      setCompleted(completed.filter(task => task.id !== draggedTask['id']));
    }

    setDraggedTask({});
  };

  useEffect(() => {
    document.querySelectorAll('[data-sortable]').forEach((element) => {
      Sortable.create(element);
    });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <nav>
        {navigationLinks.map((nav, index) =>
          <Link to={nav[0]} key={index}>{nav[1]}</Link>
        )}
      </nav>

      <div className="flex gap-4 divide-x">
        <div
          onDrop={(event) => onDrop(event, 'todos')}
          onDragOver={(event => onDragOver(event))}
        >
          <h2>Todos</h2>
          <div data-sortable>
            {todos.map(todo =>
              <div
                className="p-4 border hover:brightness-110"
                draggable
                onDrag={(event) => onDrag(event, todo)}
                onDragEnd={(event) => onDragEnd(event) }
                key={todo.id}
              >{todo.name}</div>
            )}
          </div>
        </div>

        <div
          onDrop={(event) => onDrop(event, 'completed')}
          onDragOver={(event => onDragOver(event))}
        >
          <h2>Completed</h2>
          <div data-sortable>
            {completed.map(complete =>
              <div
                className="p-4 border hover:brightness-110"
                draggable
                onDrag={(event) => onDrag(event, complete)}
                onDragEnd={(event) => onDragEnd(event) }
                key={complete.id}
              >
                {complete.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

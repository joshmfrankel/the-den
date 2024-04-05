import React, { useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';
import { useDraggable } from '@dnd-kit/core';
import Dropdown from '/src/components/Dropdown';

function Task({ taskData, handleDeleteTask }) {
  const [task, setTask] = useState(taskData);

  useEffect(() => {
    setTask(taskData)
  }, [taskData]);

  const domId = `task_${task.id}`;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: domId,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleOnChange = async (event, taskId) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target.value.trim() })
    };

    try {
      await fetch(`http://localhost:9000/tasks/${taskId}`, requestOptions);
    } catch (error) {
      console.error(error)
    }
  };

  /**
   * @see https://github.com/clauderic/dnd-kit/issues/477
   */
  return (
    <div id={domId} ref={setNodeRef} style={style} className="bg-slate-900 text-slate-200 px-4 py-2 flex justify-between items-center" {...listeners} {...attributes}>
      <ContentEditable
        html={task.name}
        onChange={(event) => handleOnChange(event, task.id)}
        className="w-full text-left outline-0"
      />
      <Dropdown>
        <button onClick={handleDeleteTask}>Delete</button>
      </Dropdown>
    </div>
  )
}

export default Task;

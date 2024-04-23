import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import Task from "/src/components/Task";
import Lane from "/src/components/Lane";

export default function TaskPage() {
  const [tasks, setTasks] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      let response = await fetch("http://localhost:9000/tasks/");
      response = await response.json();
      setTasks(response.tasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleTaskDelete = async (task) => {
    setTasks(tasks.filter(item => item.name !== task.name));
  };

  const handleDragEnd = (event) => {
    const { over } = event;
    // console.log(over)
  };

  return (
    <>
      <Link to={`/`}>Home</Link>
      <div className="grid grid-cols-4 gap-2">
        <DndContext onDragEnd={handleDragEnd}>
          <Lane id="lane_1">
            {tasks === null ? (
              <span>Loading...</span>
            ) : (
              <>
                {tasks.map(task =>
                  <Task
                    key={`task_${task.id}`}
                    task={task}
                    handleTaskDelete={() => handleTaskDelete(task)}
                  />
                )}
              </>
            )}
          </Lane>

          <Lane id="lane_2"></Lane>
        </DndContext>
      </div>
    </>
  );
}

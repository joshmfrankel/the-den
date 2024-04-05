import React, { useState, useEffect } from 'react';
import Task from '/src/components/Task';
import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

function Lane({ id, laneData }) {
  const [lane, setLane] = useState(laneData);

  useEffect(() => {
    setLane(laneData);
  }, [laneData]);

  const handleRemoveTask = (id) => {
    let updatedLane = { ...lane };
    updatedLane.tasks = updatedLane.tasks.filter((task) => task.id !== id);
    setLane(updatedLane);
  };

  return (
    <div id={id} className="border-2 p-4 flex flex-col gap-2">
      <h2>{lane.name}</h2>
      <div className="flex flex-col gap-2">
        <SortableContext items={lane.tasks}>
          {lane.tasks.map(task =>
            <Task
              key={`task_${task.id}`}
              taskData={task}
              handleDeleteTask={() => handleRemoveTask(task.id)}
            />
          )}
        </SortableContext>
      </div>
    </div>
  );
}

export default Lane;

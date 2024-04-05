import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import Task from '/src/components/Task';

function Lane({ id, laneData }) {
  const [lane, setLane] = useState(laneData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLane(laneData);
  }, [laneData]);

  const handleRemoveTask = (id) => {
    let updatedLane = { ...lane };
    updatedLane.tasks = updatedLane.tasks.filter((task) => task.id !== id);
    setLane(updatedLane);
  };

  const handleDragEnd = () => {
    console.log('dragged');
  };

  return (
    <div id={id} className="border-2 p-4 flex flex-col gap-2">
      <h2>{lane.name}</h2>
      <div className="flex flex-col gap-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lane.tasks}
            strategy={verticalListSortingStrategy}
          >
            {lane.tasks.map(task =>
              <Task
                key={`task_${task.id}`}
                taskData={task}
                handleDeleteTask={() => handleRemoveTask(task.id)}
              />
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default Lane;

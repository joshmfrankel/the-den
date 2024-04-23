import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, useSortable, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Item({ id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div id={`item_${id}`} ref={setNodeRef} style={style} {...attributes} {...listeners}>{id}</div>
  );
}

export default function HomePage() {
  const [items] = useState([1, 2, 3]);
  const [items2] = useState([4, 5, 6]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragOver = (event) => {
    const { active, over } = event;
    // console.log(over);
    // when over
  };

  return (
    <>
      <h1>Home</h1>
      <nav>
        <Link to={`boards`}>Boards</Link>
        <Link to={`tasks`}>Tasks</Link>
      </nav>
      <div>
        <h1>Sortable Example</h1>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={handleDragOver}>
          <SortableContext id="sort-1" items={items} strategy={verticalListSortingStrategy}>
            {...items.map(id => <Item id={id} key={id} />)}
          </SortableContext>
          <SortableContext id="sort-2" items={items2} strategy={verticalListSortingStrategy}>
            {...items2.map(id => <Item id={id} key={id} />)}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

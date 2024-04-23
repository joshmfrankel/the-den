import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Lane from '/src/components/Lane';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

interface BoardJson {
  board: Board;
}

interface Board {
  id: number;
  name: string;
  lanes: Array<Lane>;
}

interface Lane {
  id: number;
  name: string;
  tasks: Array<Task>;
}

interface Task {
  id: number;
  name: string;
}

/**
 * Block interactive elements from being draggable
 * @see https://github.com/clauderic/dnd-kit/issues/477#issuecomment-1713536492
 */
import { MouseSensor as LibMouseSensor, TouchSensor as LibTouchSensor } from '@dnd-kit/core';
import { MouseEvent, TouchEvent } from 'react';

// Block DnD event propagation if element have "data-no-dnd" attribute
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let cur = event.target as HTMLElement;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement as HTMLElement;
  }

  return true;
};

export class MouseSensor extends LibMouseSensor {
  static activators = [{ eventName: 'onMouseDown', handler }] as typeof LibMouseSensor['activators'];
}

export class TouchSensor extends LibTouchSensor {
  static activators = [{ eventName: 'onTouchStart', handler }] as typeof LibTouchSensor['activators'];
}

/**
 * Fixing infinite loops with useEffect
 * @see https://stackoverflow.com/a/53091204
 */
export default function BoardShowPage() {
  const [board, setBoard] = useState <Board>(false);
  const [lanes, setLanes] = useState([]);
  const { id } = useParams();

  const fetchBoard = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:9000/boards/${id}`);
      const json: BoardJson = await response.json();
      const board = json.board;
      setBoard(board)
      setLanes(board.lanes);
    } catch (error) {
      console.error(error)
    }
  }, [id]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const sensors = useSensors(
    useSensor(MouseSensor),
  );

  const handleDragEnd = (event) => {
    const { active: task, over } = event;

    // Which lane are we over?
    const currentLaneId = task.data.current.sortable.containerId;
    const newLaneId = over.data.current.sortable.containerId;

    // Identify Lane in state
    let targetLane = board.lanes.find((lane) => lane.id === newLaneId);

    if (task.id === over.id) {
      console.log('no movement');
    }

    // Find the new lane within the board state
    if (currentLaneId === newLaneId) {
      console.log('same lane');
      const newLanes = lanes.map(lane => {
        if (lane.id !== targetLane.id) {
          return lane;
        }

        let targetTasks = [ ...lane.tasks ];

        const oldIndex = targetTasks.findIndex((item) => item.id === task.id);
        const newIndex = targetTasks.findIndex((item) => item.id === over.id);
        targetTasks = arrayMove(targetTasks, oldIndex, newIndex);

        return {
          ...lane,
          tasks: targetTasks,
        };
      });

      setLanes(newLanes);
    } else {
      console.log('new lane');
      console.log(lanes);
    }
    // let updatedLanes = { ...board.lanes };

    // Array(updatedLanes).map((lane) => {
    //   if (lane.id === newLaneId) {
    //     return lane.tasks.push(task);
    //   }

    //   if (lane.id === currentLaneId) {
    //     console.log('old remove');
    //   }
    // });
    // let boardLane = updatedBoard.lanes.find((lane) => lane.id === newLaneId);
    // boardLane.tasks.push(task);
    // console.log(updatedLanes);

    // Add the task to the lane's tasks array

    // Remove the task from the old lane's tasks array

    // Set the state for the board

    // Perform a fetch update
  };

  return (
    <>
      {board === false ? (
        <span>Loading...</span>
      ) : (
        <div className='h-full w-full'>
          <h1>{board.name}</h1>
          <div className="flex h-full w-full">
            <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
              {lanes.map(lane =>
                <Lane id={`lane_${lane.id}`} key={`lane_${lane.id}`} laneData={lane}/>
              )}
            </DndContext>
            <div>
              <button>+ Add Lane</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

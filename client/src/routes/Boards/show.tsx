import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Lane from '/src/components/Lane';

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
 * Fixing infinite loops with useEffect
 * @see https://stackoverflow.com/a/53091204
 */
export default function BoardShowPage() {
  const [board, setBoard] = useState <Board>(false);
  const { id } = useParams();

  const fetchBoard = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:9000/boards/${id}`);
      const json: BoardJson = await response.json();
      const board = json.board;
      setBoard(board)
    } catch (error) {
      console.error(error)
    }
  }, [id]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  return (
    <>
      {board === false ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h1>{board.name}</h1>
          <div className="flex">
            {board.lanes.map(lane =>
              <Lane id={`lane_${lane.id}`} key={`lane_${lane.id}`} laneData={lane}/>
            )}
            <div>
              <button>+ Add Lane</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

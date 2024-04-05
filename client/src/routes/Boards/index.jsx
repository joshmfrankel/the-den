import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BoardIndexPage() {
  const [boards, setBoards] = useState(null);

  const fetchBoards = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:9000/boards/");
      const json = await response.json();
      setBoards(json.boards)
    } catch (error) {
      console.error(error)
    }
  });

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <>
      <h1>Boards</h1>
      <nav>
        <Link to={`/boards`}>Boards</Link>
        <Link to={`/tasks`}>Tasks</Link>
      </nav>
      {boards === null ? (
        <span>Loading...</span>
      ) : (
        <div className='flex gap-2 p-2'>
          {boards.map(board =>
            <Link
              key={`board_${board.id}`}
              to={`/boards/${board.id}`}
              className={'bg-slate-900 '}
            >
              {board.name}
            </Link>
          )}
        </div>
      )}
    </>
  );
}

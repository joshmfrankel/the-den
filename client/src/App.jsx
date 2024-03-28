import React, { useState, useCallback, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

import Task from './Task';

function App() {
  const [tasks, setTasks] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      await fetch("http://localhost:9000/tasks/")
        .then(result => result.json())
        .then(json => {
          setTasks(json.tasks)
        })
      } catch (error) {
        console.error(error)
      }
  }, [])

  useEffect(() => {
      fetchTasks()
  }, [fetchTasks])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="grid grid-cols-4 gap-2">
          {tasks === '' ? (
            <span>Loading...</span>
          ) : (
            <>
              {tasks.map(task => <Task task={task} />)}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

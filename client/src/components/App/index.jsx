import React, { useState, useCallback, useEffect } from 'react'
import Task from "/src/components/Task";

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

  const handleTaskDelete = async (task) => {
    setTasks(tasks.filter(item => item.name !== task.name));
  };

  /**
   * @todo Abstract grid into TaskContainer to move state out of App component
   */
  return (
    <div className="App">
      <header className="App-header">
        <div className="grid grid-cols-4 gap-2">
          {tasks === '' ? (
            <span>Loading...</span>
          ) : (
            <>
              {tasks.map(task => <Task key={`task_${task.id}`} task={task} handleTaskDelete={() => handleTaskDelete(task)} />)}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;

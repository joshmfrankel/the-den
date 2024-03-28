import ContentEditable from 'react-contenteditable';
import Dropdown from './Dropdown';

function Task({ task }) {
  const key = `task_${task.id}`;

  const handleOnChange = async (event, taskId) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target.value })
    };

    try {
      await fetch(`http://localhost:9000/tasks/${taskId}`, requestOptions)
    } catch (error) {
      console.error(error)
    }
  };

  const handleTaskDelete = async (event, taskId) => {
    const requestOptions = {
      method: 'DELETE'
    };

    try {
      await fetch(`http://localhost:9000/tasks/${taskId}`, requestOptions)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div key={key} className="bg-slate-900 text-slate-200 px-4 py-2 flex justify-between items-center">
      <ContentEditable
        html={task.name}
        onChange={(event) => handleOnChange(event, task.id)}
        className="w-full text-left"
      />
      <Dropdown>
        <button onClick={(event) => handleTaskDelete(event, task.id)}>Delete</button>
      </Dropdown>
    </div>
  )
}

export default Task;

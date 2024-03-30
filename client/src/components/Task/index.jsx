import ContentEditable from 'react-contenteditable';
import Dropdown from '/src/components/Dropdown';

function Task({ task, handleTaskDelete }) {
  const { name, id } = task;
  const handleOnChange = async (event, taskId) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target.value.trim() })
    };

    try {
      await fetch(`http://localhost:9000/tasks/${taskId}`, requestOptions)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 px-4 py-2 flex justify-between items-center">
      <ContentEditable
        html={name}
        onChange={(event) => handleOnChange(event, id)}
        className="w-full text-left"
      />
      <Dropdown>
        <button onClick={handleTaskDelete}>Delete</button>
      </Dropdown>
    </div>
  )
}

export default Task;

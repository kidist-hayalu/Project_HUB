import React, { useState } from 'react';

function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function addTasks() {
    if (newTask.trim() !== '') {
      setTasks(t => [...t, { text: newTask, completed: false }]);
      setNewTask('');
    }
  }

  function deleteTask(index) {
    setTasks(t => t.filter((_, i) => i !== index));
  }

  function toggleTask(index) {
    setTasks(t => t.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  }

  function clearCompleted() {
    setTasks(t => t.filter(task => !task.completed));
  }

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className='flex flex-col gap-6 p-10'>
      <div>
        <p className='text-sm font-medium uppercase tracking-[0.3em] text-cyan-600'>To Do List</p>
        <h2 className='mt-3 text-3xl font-semibold text-slate-900'>Manage your tasks</h2>
        <p className='mt-2 text-sm leading-6 text-slate-600'>Keep track of what needs to be done and stay organized.</p>
      </div>

      <div className='flex gap-3'>
        <input
          type='text'
          placeholder='Enter a task'
          value={newTask}
          onChange={handleChange}
          className='flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500'
        />
        <button
          onClick={addTasks}
          className='rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-700'
        >
          Add
        </button>
      </div>

      {tasks.some(task => task.completed) && (
        <button
          onClick={clearCompleted}
          className='self-start rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-xl shadow-rose-500/20 transition hover:bg-rose-700'
        >
          Clear Completed
        </button>
      )}

      <div className='space-y-3'>
        {tasks.map((task, index) => (
          <div key={index} className='flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4'>
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className='h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500'
              />
              <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>{task.text}</span>
            </div>
            <div className='flex gap-2'>
              <button
                onClick={() => moveTaskUp(index)}
                className='rounded-full p-2 text-slate-600 transition hover:bg-slate-200'
                aria-label='Move up'
              >
                <img src='/assets/up-long-solid-full.svg' alt='Up' className='h-4 w-4' />
              </button>
              <button
                onClick={() => moveTaskDown(index)}
                className='rounded-full p-2 text-slate-600 transition hover:bg-slate-200'
                aria-label='Move down'
              >
                <img src='/assets/down-long-solid-full.svg' alt='Down' className='h-4 w-4' />
              </button>
              <button
                onClick={() => deleteTask(index)}
                className='rounded-full p-2 text-slate-600 transition hover:bg-slate-200'
                aria-label='Delete'
              >
                <img src='/assets/trash-solid-full.svg' alt='Delete' className='h-5 w-5' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDo;
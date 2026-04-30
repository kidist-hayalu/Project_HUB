import React, { useState } from 'react';

function NewProject() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [isTeam, setIsTeam] = useState(false);

  function addProject() {
    if (!title.trim()) return;
    setTitle('');
    setDeadline('');
    setTeamMembers('');
    setIsTeam(false);
  }

  return (
    <div className='flex flex-col gap-6 p-10'>
      <div>
        <p className='text-sm font-medium uppercase tracking-[0.3em] text-cyan-600'>New Project</p>
        <h2 className='mt-3 text-3xl font-semibold text-slate-900'>Create a new project</h2>
        <p className='mt-2 text-sm leading-6 text-slate-600'>Add the next initiative and get your team aligned instantly.</p>
      </div>

      <div className='grid gap-4'>
        <label className='space-y-2 text-sm text-slate-700'>
          Project Title
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Enter project title'
            className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500'
          />
        </label>

        <label className='space-y-2 text-sm text-slate-700'>
          Deadline
          <input
            type='date'
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className='w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500'
          />
        </label>

        <div className='rounded-3xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-sm font-semibold text-slate-900'>Project type</p>
          <div className='mt-4 flex flex-wrap gap-4'>
            <label className='inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700'>
              <input type='radio' checked={!isTeam} onChange={() => setIsTeam(false)} />
              Individual Project
            </label>
            <label className='inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700'>
              <input type='radio' checked={isTeam} onChange={() => setIsTeam(true)} />
              Team Project
            </label>
          </div>
          {isTeam && (
            <input
              type='number'
              min='1'
              placeholder='Team members'
              value={teamMembers}
              onChange={e => setTeamMembers(e.target.value)}
              className='mt-4 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500'
            />
          )}
        </div>
      </div>

      <div className='flex justify-end'>
        <button
          type='button'
          onClick={addProject}
          className='rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:bg-cyan-700'
        >
          Create Project
        </button>
      </div>
    </div>
  );
}

export default NewProject;
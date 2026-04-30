import Card from '../Components/Card.jsx';
import Lists from '../Components/Lists.jsx';
import SearchBox from '../Components/SearchBox.jsx';
import NewProject from './NewProject.jsx';
import ToDo from '../Components/ToDo.jsx';
import React, { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import Progress from '../Components/Progress.jsx';
import Data from '../assets/Data.json';

function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToDo, setShowToDo] = useState(false);

  const dashboardStats = useMemo(() => {
    const totalProjects = Data.length;
    const totalTeams = Data.reduce((count, project) => count + project.TeamMembers.length, 0);
    const completedProjects = Data.filter(project => project.TeamMembers.every(member => member.progress >= 70)).length;
    const overallProgress = Math.round(
      Data.reduce((sum, project) => {
        const avg = project.TeamMembers.reduce((inner, member) => inner + member.progress, 0) / project.TeamMembers.length;
        return sum + avg;
      }, 0) / totalProjects
    );

    return { totalProjects, totalTeams, completedProjects, overallProgress };
  }, []);

  return (
    <>
      <Lists />

      <main className='min-h-screen bg-slate-50 pt-28 pb-12'>
        <div className='mx-auto max-w-7xl px-6'>
          <section className='rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl'>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <p className='text-sm font-medium uppercase tracking-[0.3em] text-cyan-600'>Project dashboard</p>
                <h1 className='mt-4 text-4xl font-semibold tracking-tight text-slate-900'>Welcome back to ProjectHub</h1>
                <p className='mt-3 max-w-2xl text-base leading-7 text-slate-600'>Monitor your active work, team capacity, and progress in one clear view.</p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <SearchBox />
                <button
                  type='button'
                  onClick={() => setIsOpen(true)}
                  className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-2xl'
                >
                  <Plus size={16} />
                  New Project
                </button>
              </div>
            </div>
          </section>

          <section className='mt-8 grid gap-6 lg:grid-cols-4'>
            <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
              <div className='flex items-center gap-4'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700'>
                  <img src='/assets/hourglass-half-solid-full.svg' alt='Active Projects' className='h-6 w-6' />
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Active Projects</p>
                  <p className='mt-2 text-3xl font-semibold text-slate-900'>{dashboardStats.totalProjects}</p>
                </div>
              </div>
            </div>
            <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
              <div className='flex items-center gap-4'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700'>
                  <img src='/assets/users-line-solid-full.svg' alt='Teams' className='h-6 w-6' />
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Team members</p>
                  <p className='mt-2 text-3xl font-semibold text-slate-900'>{dashboardStats.totalTeams}</p>
                </div>
              </div>
            </div>
            <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
              <div className='flex items-center gap-4'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700'>
                  <img src='/assets/list-check-solid-full.svg' alt='Completed' className='h-6 w-6' />
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Completed Projects</p>
                  <p className='mt-2 text-3xl font-semibold text-slate-900'>{dashboardStats.completedProjects}</p>
                </div>
              </div>
            </div>
            <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
              <div className='flex items-center gap-4'>
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700'>
                  <img src='/assets/chart-line-solid-full.svg' alt='Progress' className='h-6 w-6' />
                </div>
                <div>
                  <p className='text-sm font-medium text-slate-500'>Overall Progress</p>
                  <p className='mt-2 text-3xl font-semibold text-slate-900'>{dashboardStats.overallProgress}%</p>
                </div>
              </div>
            </div>
          </section>

          <section className='mt-8 grid gap-6 xl:grid-cols-[2.1fr_1fr]'>
            <div className='rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h2 className='text-2xl font-semibold text-slate-900'>Current Projects</h2>
                  <p className='mt-1 text-sm text-slate-500'>Track key initiatives and team velocity at a glance.</p>
                </div>
                <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700'>Updated just now</span>
              </div>
              <div className='mt-6 space-y-4'>
                <Card title='Most active' progress={60} openToDo={() => setShowToDo(true)} />
                <Card title='Most progress' progress={80} openToDo={() => setShowToDo(true)} />
                <Card title='Second active' progress={40} openToDo={() => setShowToDo(true)} />
              </div>
            </div>

            <aside className='rounded-[2rem] bg-gradient-to-b from-cyan-50 to-white p-6 shadow-xl shadow-slate-200/30'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-xl font-semibold text-slate-900'>Team pulse</h3>
                  <p className='mt-1 text-sm text-slate-500'>Live summary of your highest priority work.</p>
                </div>
                <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700'>Healthy</span>
              </div>

              <div className='mt-6 space-y-5'>
                <div className='rounded-3xl bg-white p-5 shadow-sm'>
                  <p className='text-sm font-medium text-slate-500'>Average completion</p>
                  <p className='mt-3 text-3xl font-semibold text-slate-900'>{dashboardStats.overallProgress}%</p>
                  <div className='mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200'>
                    <div className='h-full rounded-full bg-cyan-600' style={{ width: `${dashboardStats.overallProgress}%` }} />
                  </div>
                </div>
                <div className='rounded-3xl bg-white p-5 shadow-sm'>
                  <p className='text-sm font-medium text-slate-500'>Projects in review</p>
                  <p className='mt-2 text-2xl font-semibold text-slate-900'>{dashboardStats.completedProjects}</p>
                </div>
                <div className='rounded-3xl bg-white p-5 shadow-sm'>
                  <p className='text-sm font-medium text-slate-500'>Team members active</p>
                  <p className='mt-2 text-2xl font-semibold text-slate-900'>{dashboardStats.totalTeams}</p>
                </div>
                <div className='rounded-3xl bg-white p-5 shadow-sm'>
                  <p className='text-sm font-medium text-slate-500'>Focused today</p>
                  <p className='mt-2 text-xl font-semibold text-slate-900'>3 projects</p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl'
            onClick={event => event.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className='absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200'
              aria-label='Close project modal'
            >
              <X size={18} />
            </button>
            <NewProject />
          </div>
        </div>
      )}

      {showToDo && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm'
          onClick={() => setShowToDo(false)}
        >
          <div
            className='relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl'
            onClick={event => event.stopPropagation()}
          >
            <button
              onClick={() => setShowToDo(false)}
              className='absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200'
              aria-label='Close To Do modal'
            >
              <X size={18} />
            </button>
            <ToDo />
          </div>
        </div>
      )}
    </>
  );
}

export default Project;
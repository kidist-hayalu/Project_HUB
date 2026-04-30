import { useState } from 'react';
import Lists from '../Components/Lists'
import SearchBox from '../Components/SearchBox';
import Data from '../assets/Data.json';
import Avatar from "react-avatar";
import { ChevronDown, ChevronUp, Users, User, BarChart3 } from 'lucide-react';

function Teams() {

    const [isOpen, setIsOpen] = useState(null);
    const [filterOptions, setFilterOptions] = useState("all");
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);

    const filteredTypes = Data.filter(project => {
        if (filterOptions === "all")
            return true;
        if (filterOptions === "individual")
            return project.TeamMembers.length === 1;
        if (filterOptions === "team")
            return project.TeamMembers.length > 1;

        return true;
    });

    const getTeamStats = () => {
        const totalMembers = filteredTypes.reduce((sum, project) => sum + project.TeamMembers.length, 0);
        const activeMembers = filteredTypes.reduce((sum, project) =>
            sum + project.TeamMembers.filter(member => member.progress < 100).length, 0);
        const completedMembers = totalMembers - activeMembers;
        return { totalMembers, activeMembers, completedMembers };
    };

    const stats = getTeamStats();


    return (
        <>
            <Lists />
            <main className='min-h-screen bg-slate-50 pt-28 pb-12'>
                <div className='mx-auto max-w-7xl px-6'>
                    <section className='rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl'>
                        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                            <div>
                                <p className='text-sm font-medium uppercase tracking-[0.3em] text-cyan-600'>Team management</p>
                                <h1 className='mt-4 text-4xl font-semibold tracking-tight text-slate-900'>Monitor team performance</h1>
                                <p className='mt-3 max-w-2xl text-base leading-7 text-slate-600'>Track individual progress, team collaboration, and project completion across all initiatives.</p>
                            </div>
                            <SearchBox />
                        </div>
                    </section>

                    <section className='mt-8 grid gap-6 lg:grid-cols-3'>
                        <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
                            <div className='flex items-center gap-4'>
                                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700'>
                                    <Users size={24} />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-slate-500'>Total Members</p>
                                    <p className='mt-2 text-3xl font-semibold text-slate-900'>{stats.totalMembers}</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
                            <div className='flex items-center gap-4'>
                                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700'>
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-slate-500'>Active Members</p>
                                    <p className='mt-2 text-3xl font-semibold text-slate-900'>{stats.activeMembers}</p>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1'>
                            <div className='flex items-center gap-4'>
                                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700'>
                                    <BarChart3 size={24} />
                                </div>
                                <div>
                                    <p className='text-sm font-medium text-slate-500'>Completed Tasks</p>
                                    <p className='mt-2 text-3xl font-semibold text-slate-900'>{stats.completedMembers}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='mt-8'>
                        <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
                            <div>
                                <h2 className='text-2xl font-semibold text-slate-900'>{filterOptions.charAt(0).toUpperCase() + filterOptions.slice(1)} Teams</h2>
                                <p className='mt-1 text-sm text-slate-500'>Click on projects to view team members and their progress.</p>
                            </div>
                            <div className='relative inline-flex'>
                                <button
                                    type='button'
                                    onClick={() => setFilterMenuOpen(prev => !prev)}
                                    className='inline-flex w-56 items-center justify-between rounded-[1.75rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-200/30 transition hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-100'
                                >
                                    <span>{filterOptions === 'all' ? 'All Projects' : filterOptions === 'individual' ? 'Individual Projects' : 'Team Projects'}</span>
                                    <ChevronDown size={18} className='text-slate-500' />
                                </button>

                                {filterMenuOpen && (
                                    <div className='absolute right-0 z-40 mt-3 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40'>
                                        <button
                                            type='button'
                                            onClick={() => { setFilterOptions('all'); setFilterMenuOpen(false); }}
                                            className='w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100'
                                        >
                                            All Projects
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => { setFilterOptions('individual'); setFilterMenuOpen(false); }}
                                            className='w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100'
                                        >
                                            Individual Projects
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => { setFilterOptions('team'); setFilterMenuOpen(false); }}
                                            className='w-full px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100'
                                        >
                                            Team Projects
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='mt-6 space-y-4'>
                            {filteredTypes.map((project, index) => (
                                <div key={index} className='overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:shadow-lg'>
                                    <div
                                        className='flex cursor-pointer items-center justify-between p-6 transition hover:bg-slate-50'
                                        onClick={() => setIsOpen(isOpen === index ? null : index)}
                                    >
                                        <div className='flex items-center gap-4'>
                                            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700'>
                                                {project.TeamMembers.length === 1 ? <User size={20} /> : <Users size={20} />}
                                            </div>
                                            <div>
                                                <h3 className='text-lg font-semibold text-slate-900'>{project.ProjectTitle}</h3>
                                                <p className='text-sm text-slate-500'>{project.TeamMembers.length} member{project.TeamMembers.length !== 1 ? 's' : ''}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700'>
                                                {project.TeamMembers.length === 1 ? 'Individual' : 'Team'}
                                            </span>
                                            {isOpen === index ? <ChevronUp size={20} className='text-slate-400' /> : <ChevronDown size={20} className='text-slate-400' />}
                                        </div>
                                    </div>

                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className='border-t border-slate-200 bg-slate-50/50 p-6'>
                                            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                                                {project.TeamMembers.map((member, memberIndex) => (
                                                    <div key={memberIndex} className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md'>
                                                        <div className='flex items-center gap-3 mb-3'>
                                                            <Avatar name={member.name} size="48" round={true} />
                                                            <div>
                                                                <h4 className='font-semibold text-slate-900'>{member.name}</h4>
                                                                <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                                                    member.progress === 100 ? 'bg-emerald-100 text-emerald-700' :
                                                                    member.progress > 60 ? 'bg-cyan-100 text-cyan-700' :
                                                                    'bg-amber-100 text-amber-700'
                                                                }`}>
                                                                    {member.progress === 100 ? 'Completed' : member.progress > 60 ? 'On Track' : 'Behind'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className='mb-4 text-sm text-slate-600'>{member.activity}</p>
                                                        <div className='space-y-2'>
                                                            <div className='flex justify-between text-sm'>
                                                                <span className='text-slate-500'>Progress</span>
                                                                <span className='font-medium text-slate-900'>{member.progress}%</span>
                                                            </div>
                                                            <div className='h-2 overflow-hidden rounded-full bg-slate-200'>
                                                                <div
                                                                    className='h-full rounded-full bg-gradient-to-r from-cyan-600 to-sky-500 transition-all duration-500 ease-out'
                                                                    style={{ width: `${member.progress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )

}
export default Teams;
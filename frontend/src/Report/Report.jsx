import { useMemo, useState } from "react";
import Lists from "../Components/Lists";
import SearchBox from "../Components/SearchBox";
import NewProject from "../Project/NewProject";
import Data from "../assets/Data.json";
import { X, Filter, LineChart, BarChart3 } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

import { Bar, Doughnut, Line } from "react-chartjs-2";

function Report() {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("");

    const memberRows = useMemo(
        () => Data.flatMap(project =>
            project.TeamMembers.map(member => ({
                ...member,
                project: project.ProjectTitle
            }))
        ),
        []
    );

    const filteredMembers = memberRows.filter(member =>
        member.name.toLowerCase().includes(filter.toLowerCase()) ||
        member.activity.toLowerCase().includes(filter.toLowerCase()) ||
        member.project.toLowerCase().includes(filter.toLowerCase())
    );

    const stats = useMemo(() => {
        const totalProjects = Data.length;
        const totalMembers = Data.reduce((sum, project) => sum + project.TeamMembers.length, 0);
        const totalTasks = Data.reduce(
            (sum, project) => sum + project.TeamMembers.reduce((taskSum, member) => taskSum + (member.tasks || 0), 0),
            0
        );
        const avgProgress = Math.round(
            Data.reduce(
                (sum, project) =>
                    sum + project.TeamMembers.reduce((innerSum, member) => innerSum + member.progress, 0) / project.TeamMembers.length,
                0
            ) / Data.length
        );

        return { totalProjects, totalMembers, totalTasks, avgProgress };
    }, []);

    const projectLabels = Data.map(project => project.ProjectTitle);
    const avgProjectProgress = Data.map(project =>
        Math.round(project.TeamMembers.reduce((sum, member) => sum + member.progress, 0) / project.TeamMembers.length)
    );
    const projectTaskCounts = Data.map(project =>
        project.TeamMembers.reduce((sum, member) => sum + (member.tasks || 0), 0)
    );
    const totalCompleted = Data.reduce(
        (sum, project) => sum + project.TeamMembers.filter(member => member.progress === 100).length,
        0
    );
    const totalPending = memberRows.length - totalCompleted;

    return (
        <>
            <Lists />
            <main className="min-h-screen bg-slate-50 pt-28 pb-12">
                <div className="mx-auto max-w-7xl px-6">
                    <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-600">Reports</p>
                                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Project performance overview</h1>
                                <p className="mt-3 text-base leading-7 text-slate-600">Analyze team velocity, task load, and progress trends across every active project.</p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <SearchBox />
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(true)}
                                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-700"
                                >
                                    <BarChart3 size={16} />
                                    New Project
                                </button>
                            </div>
                        </div>
                    </section>

                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                            <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
                                    aria-label="Close project modal"
                                >
                                    <X size={18} />
                                </button>
                                <div className="p-10">
                                    <NewProject />
                                </div>
                            </div>
                        </div>
                    )}

                    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/30">
                            <p className="text-sm font-medium text-slate-500">Projects</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalProjects}</p>
                            <p className="mt-2 text-sm text-slate-500">Active project summaries</p>
                        </div>
                        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/30">
                            <p className="text-sm font-medium text-slate-500">Team members</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalMembers}</p>
                            <p className="mt-2 text-sm text-slate-500">Combined team capacity</p>
                        </div>
                        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/30">
                            <p className="text-sm font-medium text-slate-500">Average progress</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.avgProgress}%</p>
                            <p className="mt-2 text-sm text-slate-500">Avg project completion rate</p>
                        </div>
                        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/30">
                            <p className="text-sm font-medium text-slate-500">Total tasks</p>
                            <p className="mt-4 text-3xl font-semibold text-slate-900">{stats.totalTasks}</p>
                            <p className="mt-2 text-sm text-slate-500">Open and assigned tasks</p>
                        </div>
                    </section>

                    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">Team member report</h2>
                                <p className="mt-1 text-sm text-slate-500">Search team members by name, activity, or project.</p>
                            </div>
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                    placeholder="Search by name, activity, or project"
                                    className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none shadow-sm transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                                />
                                <Filter className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>

                        <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-4">
                            <DataTable value={filteredMembers} className="w-full" responsiveLayout="scroll">
                                <Column field="id" header="ID" sortable />
                                <Column field="name" header="Member" sortable />
                                <Column field="project" header="Project" sortable />
                                <Column field="activity" header="Activity" sortable />
                                <Column field="progress" header="Progress" sortable />
                                <Column field="tasks" header="Tasks" sortable />
                            </DataTable>
                        </div>
                    </section>

                    <section className="mt-8 grid gap-6 xl:grid-cols-3">
                        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-700">
                                    <LineChart size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Project progress</p>
                                    <h3 className="text-xl font-semibold text-slate-900">Average progress per project</h3>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Line
                                    data={{
                                        labels: projectLabels,
                                        datasets: [
                                            {
                                                label: 'Avg Progress',
                                                data: avgProjectProgress,
                                                borderColor: 'rgba(6, 182, 212, 1)',
                                                backgroundColor: 'rgba(6, 182, 212, 0.12)',
                                                tension: 0.35,
                                                fill: true,
                                                pointRadius: 4,
                                            }
                                        ]
                                    }}
                                />
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
                                    <BarChart3 size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Task load</p>
                                    <h3 className="text-xl font-semibold text-slate-900">Tasks by project</h3>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Bar
                                    data={{
                                        labels: projectLabels,
                                        datasets: [
                                            {
                                                label: 'Task count',
                                                data: projectTaskCounts,
                                                backgroundColor: ['rgba(56, 189, 248, 0.9)', 'rgba(34, 197, 94, 0.85)', 'rgba(129, 140, 248, 0.85)'],
                                                borderRadius: 12,
                                            }
                                        ]
                                    }}
                                />
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/40">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-violet-100 text-violet-700">
                                    <Filter size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Completion</p>
                                    <h3 className="text-xl font-semibold text-slate-900">Team completion ratio</h3>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Doughnut
                                    data={{
                                        labels: ['Completed', 'Pending'],
                                        datasets: [
                                            {
                                                data: [totalCompleted, totalPending],
                                                backgroundColor: ['rgba(34, 197, 94, 0.85)', 'rgba(6, 182, 212, 0.75)'],
                                                borderWidth: 0,
                                            }
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Report;

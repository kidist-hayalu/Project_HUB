import { useEffect, useState } from "react";
import Lists from "../Components/Lists";
import SearchBox from "../Components/SearchBox";
import NewProject from "../Project/NewProject";
import Data from "../assets/Data.json";
import { X, Filter, LineChart } from 'lucide-react';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

import { Chart as ChartJS, plugins} from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

function Report() {

    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const [isAsc, setIsAsc] = useState(true);



    const initialMembers = [
        { id: 1, name: 'Alice', activity: 'Design', progress: 75, tasks: 5 },
        { id: 2, name: 'Richard', activity: 'Development', progress: 60, tasks: 2 },
        { id: 3, name: 'Elora', activity: 'Testing', progress: 40, tasks: 6 }
    ];

    const filteredMembers = initialMembers.filter(
        i => i.name.toLowerCase().includes(filter.toLowerCase()) ||
            i.activity.toLowerCase().includes(filter.toLowerCase())
    );

    function handleSort() {
        setIsAsc(!isAsc);
    }

    const dat = Data.map((data) => data.ProjectTitle);
    return (
        <>
            
                <Lists />
            
            <div className='container px-6'>
                <div className='top-container mx-12 mt-16'>
                    <SearchBox className='flex items-center justify-self-center ml-40' />

                    <button onClick={() => setIsOpen(!isOpen)}>New Project</button>

                    {isOpen && (
                        <div className='fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50'>
                            <div className='w-1/2 h-4/5 m-20 relative bg-white shadow-lg'>
                                <NewProject className="shadow-lg w-96 p-6 rounded" />
                                <div className='mt-4 flex absolute top-1 right-6 justify-end'>
                                    <button onClick={() => setIsOpen(false)} className='p-2 rounded-full'><X /></button>
                                </div>
                            </div>
                        </div>)}
                </div>


                <div className='flex flex-col mx-6'>
                    <h2 className="text-2xl font-bold mx-14 mt-4 mb-6">{Data[0].ProjectTitle} Report</h2>
                    <div className="flex items-center justify-self-center mb-4 mx-14 border rounded w-1/4">
                        <input
                            type="text"
                            placeholder="Search by name or activity"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className='ml-30 w-full border-none pl-2' />
                        <Filter className='w-5 h-5 text-gray-500 relative pr-1'/>
                    </div>
                    <div className="flex flex-row">
                    <div className="border rounded-sm mx-6 w-full">
                    <DataTable value={filteredMembers} className="w-full">
                        <Column field="id" header="ID" sortable  />
                        <Column field="name" header="Member Name" sortable  />
                        <Column field="activity" header="Activity" sortable  />
                        <Column field="progress" header="Progress" sortable  />
                        <Column field="tasks" header="Tasks" sortable  />
                    </DataTable>
                    </div>
                    
                    </div>
                </div>

                <div className="chart-container mt-10 mx-14 mb-10 flex flex-row w-full items-center justify-center">
                    <div className="w-1/2" >
                        <Line className="w-full" data={{
                            labels: dat,
                            datasets: [
                                {
                                    label: 'Overall Progress',
                                    data: Data.map((data) => data.TeamMembers.map(member => member.progress)).flat(),
                                    fill: false,
                                    borderColor: 'rgba(6, 182, 212, 1)',
                                    tension: 0.1
                                }
                            ]
                        }}/>
                    </div>
                    <div className="w-1/2">
                    <Bar className="w-full mr-32" data={{
                        labels: Data.map((data) => data.ProjectTitle),
                        datasets: [
                            {
                                label: "Individual Progress",
                                data: Data.map((data) => data.TeamMembers.map(member => member.progress)).flat(),
                                backgroundColor: [
                                "rgba(6, 182, 212, 1)",
                                "rgba(8,145,178,1)",
                                "rgba(14, 116, 144, 1)"
                                ],
                                borderRadius: 5,

                            }
                        ]
                    }}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Report;
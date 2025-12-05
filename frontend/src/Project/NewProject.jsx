import React, { useState } from 'react';
import { Link } from 'lucide-react';

function NewProject(){
    const [pro, setPro] = useState([]);
    const [title, setTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [teamMembers, setTeamMembers] = useState("");
    const [isTeam, setIsTeam] = useState(false);

    function addProject(){
        const newProject = { Title: title, Deadline: deadline, TeamMembers: teamMembers };
        setPro((prev) => [...prev, newProject]);
        setTitle("");
        setDeadline("");
        setTeamMembers("");
        setIsTeam(false);
    }

    return(
        <div className='flex flex-col items-center justify-center pt-28'>
            <h1 className='font-bold flex justify-start w-4/5 text-xl mb-4'>Create New Project</h1>
            <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className='border p-1 ml-4 my-4 w-4/5'/>
            <input type="date" placeholder="Project deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} className='border p-1 ml-4 my-4 w-4/5'/>
            <div className='w-4/5 m-2'>
            <p className='font-heading mb-3 ml-2'>Select Project Type:</p>
                <div className='ml-10'>
                    <input type="radio" className='rounded' checked={!isTeam} onChange={() => setIsTeam(false)}  />
                    <label className='mr-12 pl-2'>Individual Project</label>
                    <input type="radio" className='rounded ml-12' checked={isTeam} onChange={() => setIsTeam(true)} />
                    <label className='pl-2'>Team Project</label>
                </div>
                {isTeam && (
                <input type="number" placeholder="Team members" className='border p-1 mt-4 ml-10 w-4/5' value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)}/>
            )}
            </div>
            

            
                <button className='mt-6 flex absolute bottom-20 right-24 justify-end' onClick={addProject}>Create Project</button>
           
        </div>
    )
}

export default NewProject;
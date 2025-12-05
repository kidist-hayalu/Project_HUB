import { useState, useEffect } from 'react';
import Lists from '../Components/Lists'
import SearchBox from '../Components/SearchBox';
import Data from '../assets/Data.json';
import Avatar from "react-avatar";

function Teams() {

    const [filter, setFilter] = useState("");
    const [isOpen, setIsOpen] = useState(null);
    const [filterOptions, setFilterOptions] = useState("all");
    const [animate, setAnimate] = useState(false);

    const data = Data.map((dat) => dat.TeamMembers);
    const type = Data.map((ti) => ti.ProjectType);

    const filteredTypes = Data.filter(project => {
        if (filterOptions === "all")
            return true;
        if (filterOptions === "individual")
            return project.TeamMembers.length === 1;
        if (filterOptions === "team")
            return project.TeamMembers.length > 1;

        return true;
    });

    useEffect(() => {
        setAnimate(true);
    }, [])


    return (
        <>
            <Lists />
            <div className='container px-16'>
                <div className='top-container mx-60 mt-16'>

                    <SearchBox className='flex items-center justify-self-center ml-60' />
                </div>
                <div className='flex flex-col items-center justify-center w-full mt-2 p-6 '>
                    <div className='flex flex-row items-center justify-space-between mx-12 w-full'>
                        <h2 className='font-bold font-heading text-3xl flex items-start ml-20 mr-60 justify-start'>{filterOptions.charAt(0).toUpperCase() + filterOptions.slice(1)} Teams</h2>
                        <div className='ml-96 w-1/4 flex items-end justify-end'>
                            <select id='filterOptions' value={filterOptions} onChange={e => setFilterOptions(e.target.value)} className='border rounded font-heading flex items-center justify-center w-full p-1 outline-none cursor-pointer'>
                                <option className='font-heading' value="all">All Projects</option>
                                <option className='font-heading' value="individual">Individual Projects</option>
                                <option className='font-heading' value="team">Team Projects</option>
                            </select></div>
                    </div>
                    <div className='w-full flex flex-row items-start justify-start mt-2'>
                        <div className='w-full mx-8 '>
                            {filteredTypes.map((title, index) => (<div className='border flex flex-col p-2 list-none rounded shadow-sm my-3 transition-all duration-500 ease-in-out hover:shadow-md hover:cursor-pointer bg-white/80' key={index}>
                                <div className='flex flex-row items-center justify-between mx-4 pl-3 pr-5 py-2'>
                                    <li className=' font-heading font-semibold text-xl'>{title.ProjectTitle}</li>
                                    <button className='text-sans text-sm transition-all duration-700 ease-in-out' onClick={() => { setIsOpen(isOpen === index ? null : index); }}>Members</button>
                                </div>

                                <div className={`flex items-start justify-start flex-col overflow-hidden origin-top transition-all duration-500 ease-in-out w-full pb-2 ${isOpen === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <ul className='w-full my-2'>{title.TeamMembers.map((n, nIndex) => (<div className='w-full flex'>
                                        <li className='list-none mr-12 ml-24 my-4 w-full' key={nIndex}>
                                            <div className='flex flex-row items-center justify-between'>
                                                <div className='flex flex-row items-center'>
                                                    <Avatar name={n.name} size="40" round={true} className="inline-block mr-4 mb-2" />
                                                    <h3 className='text-lg font-semibold'>{n.name}</h3>
                                                </div>
                                                <span className={`text-xs px-3 py-1 rounded-full font-medium mr-64
                                                        ${n.progress === 100 ? 'bg-green-100 text-green-700' :
                                                        n.progress > 60 ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'}`}>
                                                    {n.progress === 100 ? 'Completed' : n.progress > 60 ? 'On Track' : 'Behind'}
                                                </span>

                                            </div>

                                            <span className='opacity-85 text-sm '>{n.activity}</span>
                                            <div className='outerbox border-2 my-2 box-border rounded-xl overflow-hidden border-block-500 w-3/4'>
                                                <div className='innerbox text-right text-opacity-80 text-white h-full bg-cyan-600 pr-2' style={{ width: `${n.progress}%`, transition: `width 0.5s ease` }}>{n.progress}%</div>
                                            </div>



                                        </li>
                                    </div>
                                    ))}</ul>
                                </div>

                            </div>
                            ))}
                        </div>

                    </div>
                </div>


            </div>
        </>
    )

}
export default Teams;
import {Search, X} from 'lucide-react';
import { useState } from 'react';
import Data from '../assets/Data.json';

function SearchBox(){

    const [query, setQuery] = useState('');
    const dat = Data.map(data => data.ProjectTitle);

    const filteredProjects = dat.filter(project => project.toLowerCase().includes(query.toLowerCase()));


    function handleChange(event){
        setQuery(event.target.value);
    }

    function handleClick(project){
        setQuery(project);
    }

    
    

    function clearButton(){
        if(!query)
            return null;
        return (
            <button onClick={handleClick} className="text-gray-400 hover:text-gray-600"aria-label="Clear search">
                <X className='w-4 h-4' />
            </button>
        );
    }
    return (
       <div className='flex flex-col items-center px-3 py-2 w-full max-w-md'>
        <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 w-full max-w-md shadow-sm hover:shadow-md transition-shadow">  
            <div className="flex items-center flex-1 w-5 h-3 text-gray-500 mr-2" >   
                <input type="text" placeholder="Search..." value={query} onChange={handleChange} className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400" />
                <Search className="w-5 h-4 text-gray-500 mr-2 opacity-70" onClick={handleClick}/>
            </div>
            
        </div>
        {query !== '' && (
                <div className='px-4 py-2 shadow-md inset-0 transition-all duration-300 w-full mt-1 flex flex-col' ><ul>{filteredProjects.map((project, index) => <li className='mb-2 hover:cursor-pointer' onClick={() => setQuery(project)} key={index}>{project}</li>)}</ul></div>
            )}
        </div>
    )
}

export default SearchBox
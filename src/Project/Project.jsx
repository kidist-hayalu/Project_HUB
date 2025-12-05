import Card from '../Components/Card.jsx';
import Lists from '../Components/Lists.jsx';
import SearchBox from '../Components/SearchBox.jsx';
import NewProject from './NewProject.jsx';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import Progress from '../Components/Progress.jsx';
import Data from '../assets/Data.json';

function Project() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Lists />

      <div className='container px-16'>
        <div className='top-container mx-12 mt-16'>

          <SearchBox className='flex items-center justify-self-center ml-40' />
          <button onClick={() => setIsOpen(!isOpen)}>New Project</button>

          {isOpen && (
            <div className='fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50'>
              <div className='w-1/2 h-4/5 m-20 relative bg-white shadow-lg'>
                <NewProject className="shadow-lg w-96 p-6 rounded" />
                <div className='mt-4 flex absolute top-1 right-6 justify-end'>
                  <button onClick={() => setIsOpen(false)} className='p-2 rounded-full border-none'><X /></button>
                </div>
              </div>
            </div>)}

        </div>

        <div className='flex flex-row mb-3'>

          <div className='w-1/4 mx-6 py-12 rounded-sm shadow-md flex flex-row hover:shadow-lg bg-white'>
            <img src='/assets/hourglass-half-solid-full.svg' alt="Link List Icon" className='w-14 h-14 mx-2' />
            <div className='flex flex-col'>
              <p className='text-3xl font-bold'>{Data.length}</p>
              <h3 className='font-sans font-semibold'>Active Projects</h3>
            </div>
          </div>
          <div className='w-1/4 mx-6 py-12 rounded-sm shadow-md flex flex-row hover:shadow-lg bg-white'>
            <img src='/assets/users-line-solid-full.svg' alt="Link List Icon" className='w-14 h-14 mx-2' />
            <div className='flex flex-col'>
              <p className='text-3xl font-bold'>{Data.length}</p>
              <h3 className='font-sans font-semibold'>Total Teams</h3>
            </div>
          </div>
          <div className='w-1/4 mx-6 py-12 rounded-sm shadow-md flex flex-row hover:shadow-lg bg-white'>
            <img src='/assets/list-check-solid-full.svg' alt="Link List Icon" className='w-14 h-14 mx-2' />
            <div className='flex flex-col'>
              <p className='text-3xl font-bold'>{Data.length}</p>
              <h3 className='font-sans font-semibold'>Completed Projects</h3>
            </div>
            </div>
            <div className='w-1/4 mx-6 py-12 rounded-sm shadow-md flex flex-row hover:shadow-lg bg-white'>
              <img src='/assets/chart-line-solid-full.svg' alt="Link List Icon" className='w-14 h-14 mx-2' />
              <div className='flex flex-col'>
                <p className='text-3xl font-bold'>{Data.length}</p>
                <h3 className='font-sans font-semibold'>Overall Progress</h3>
              </div>
            </div>
                      
          </div>

          <div className='min-container '>
            <div className='Cards rounded-lg mt-3 ml-6 w-3/5 px-4'>
              <h3 className='all-projects font-semibold font-heading text-3xl mt-3 ml-4'>Current Projects</h3>
              <Card title="Most active" progress={60} />
              <Card title="Most progress" progress={80} />
              <Card title="Second active" progress={40} />
            </div>
            <div className='ToDo mr-3 p-4 mt-3 ml-4 w-2/5 rounded-lg'>
              <Progress className='w-full ' />
            </div>
          </div>
        
      </div>
    </>
  )
}

export default Project;
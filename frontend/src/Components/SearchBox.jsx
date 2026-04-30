import {Search, X} from 'lucide-react';
import { useState } from 'react';
import Data from '../assets/Data.json';

function SearchBox() {
  const [query, setQuery] = useState('');
  const projectTitles = Data.map(item => item.ProjectTitle);
  const filteredProjects = projectTitles.filter(project =>
    project.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => setQuery('');

  return (
    <div className='relative w-full max-w-md'>
      <div className='flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md'>
        <Search className='h-5 w-5 text-slate-400' />
        <input
          type='text'
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder='Search projects...'
          className='w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400'
        />
        {query && (
          <button
            type='button'
            onClick={clearSearch}
            aria-label='Clear search'
            className='text-slate-400 transition hover:text-slate-600'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      {query && filteredProjects.length > 0 && (
        <div className='absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl'>
          <ul className='max-h-56 space-y-1 overflow-y-auto p-3'>
            {filteredProjects.map((project, index) => (
              <li
                key={index}
                className='cursor-pointer rounded-2xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100'
                onClick={() => setQuery(project)}
              >
                {project}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBox
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Card(props) {

  const [progress, setProgress] = useState(props.progress);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setProgress(0);
    const timeout = setTimeout(() => {
      setProgress(props.progress);
    }, 300);
    return () => clearTimeout(timeout);
  }, [props.progress]);

  const statusLabel = progress >= 75 ? 'On track' : progress >= 45 ? 'At risk' : 'Needs support';
  const statusClass = progress >= 75 ? 'bg-emerald-100 text-emerald-700' : progress >= 45 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700';


  return (
    <div className='relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
      <div className='mb-4 flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold text-slate-900'>{props.title}</h3>
          <p className='mt-1 text-sm text-slate-500'>Project progress summary</p>
        </div>

        <div className='relative'>
          <button
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            className='rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50'
          >
            Options
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 z-50 mt-3 w-40 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg'
              >
                <div className='flex flex-col'>
                  <button
                    type='button'
                    onClick={() => {
                      props.openToDo();
                      setMenuOpen(false);
                    }}
                    className='px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-slate-100'
                  >
                    View To Do
                  </button>
                  <Link to='/Teams' className='px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100'>
                    Team
                  </Link>
                  <Link to='/Report' className='px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100'>
                    Report
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className='mb-5 flex items-center justify-between gap-3'>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}>{statusLabel}</span>
        <span className='text-sm font-medium text-slate-500'>{progress}% complete</span>
      </div>

      <p className='mb-4 text-sm leading-6 text-slate-600'>A quick update for keeping your team aligned and focused on the next milestone.</p>

      <div className='rounded-full bg-slate-200 p-1'>
        <div className='h-3 rounded-full bg-cyan-600 transition-all duration-500 ease-out' style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

Card.propTypes = {
    title: PropTypes.string,
    progress: PropTypes.number,
    openToDo: PropTypes.func
}
Card.defaultProps = {
    title: "New Project",
    progress: 0,
    openToDo: () => {}
}

export default Card
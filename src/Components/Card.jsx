import { X } from 'lucide-react';
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react';
import ToDo from './ToDo';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Card(props) {

    const [progress, setProgress] = useState(props.progress);
    const [team, setTeam] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setProgress(0);
        setTimeout(() => {
            setProgress(props.progress);
        }, 500);
        return () => clearTimeout();
    }, [props.progress]);

    function handleProgress() {
        setProgress(p => Math.min(p + 10, 100));
    }


    return (
        <div className="card-container p-3 flex flex-col">
            <div className='flex flex-row'>
                <h1 className='w-4/5 font-sans'>{props.title}</h1>
                <button className='justify-center space-y-1 ml-28 top-0 border-none p-0 mb-2 w-1/6 focus:outline-none relative inline-block text-left text-sm' onClick={() => setMenuOpen(!menuOpen)}>

                     More Options
                    {menuOpen && (
                        <AnimatePresence>
                        <motion.div
                        initial={{opacity:0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className='absolute justify-center z-50 transition-transform origin-top-right right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='py-1 flex flex-col font-sans bg-white items-center justify-center border'>
                                <a href='#' className='p-3 rounded' onClick={() => setIsOpen(true)}>To Do</a>
                                <Link to={"/Teams"}>
                                <a href='#' className='p-3 rounded '>Team</a>
                                </Link>
                                <Link to={"/Report"}>
                                <a href='#' className='p-3 rounded '>Report</a>
                                </Link>
                            </div>
                        </motion.div>
                        </AnimatePresence>
                    )}
                </button>

                {isOpen && (
                    <div className='fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50'>
                        <div className='w-1/2 h-4/5 m-20 relative bg-white shadow-lg'>
                            <div className='mt-4 flex absolute top-1 right-6 justify-end'>
                                <button onClick={() => setIsOpen(false)} className='p-2 rounded-full border-none'><X /></button>
                            </div>
                            <ToDo className='shadow-lg w-96 p-6 rounded' />
                            
                        </div>
                    </div>
                )}
            </div>

            <p >This is the progress of {props.title}</p>



            <div className='outerbox border-2 mt-2 box-border rounded-xl overflow-hidden border-black-500'>
                <div className='innerbox  text-right text-white bg-cyan-600 h-full' style={{
                    width: `${progress}%`,
                    transition: `width 0.5s ease`
                }}>{progress}%</div>
            </div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    progress: PropTypes.number
}
Card.defaultProps = {
    title: "New Project",
    progress: 0
}

export default Card
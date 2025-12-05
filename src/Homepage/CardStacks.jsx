function CardStacks(){

    return(
        <div className='flex flex-row h-screen px-6 mb-16 scroll-mt-10' id='Services'>
                    <div className='py-10 flex flex-row w-full'>

                        <div className="relative mt-2 flex items-center justify-center w-1/2 overflow-visible">
                            <div className="absolute inset-0 z-10 bg-cyan-900 w-full h-full origin-left shadow-md transition transform duration-700 hover:scale-x-[2]" onMouseEnter={() => setCardClick(true)} onMouseLeave={() => setCardClick(false)}>
                                <p className='relative inset-0 justify-end text-white '>Track Your Progress With Our Charts </p>
                            </div>


                            <div className="absolute inset-0 z-[15] bg-cyan-800 w-3/4 h-full origin-left transition transform duration-700 shadow-md hover:scale-x-[2.67]"></div>
                            <div className="absolute inset-0 z-20 bg-cyan-700 w-2/4 h-full origin-left transition transform duration-700 shadow-md hover:scale-x-[4]"></div>
                            <div className="absolute z-[25] inset-0  p-4 bg-cyan-600 w-1/4 h-full origin-left transform transition duration-700  hover:shadow-lg hover:scale-x-[8]" onMouseEnter={() => setTeamWork(true)} onMouseLeave={() => setTeamWork(false)}></div>
                            <div className={`absolute top-8 left-3/4 ml-2 items-center bg-white mr-4 w-full z-30 transition-opacity duration-200 ${cardClick ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                                
                            </div>
                            <div className={`absolute top-8 left-3/4 ml-2 items-center mr-4 bg-white w-full z-40 transition-opacity duration-200 ${teamWork ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                                
                            </div>

                        </div>
                        <div className='z-0 inset-0 flex items-center justify-center p-4 pointer-events-none my-2'>
                            <motion.p className='text-slate-800 font-heading font-bold text-xl text-center'
                                initial={{ x: 0, opacity: 0 }}
                                whileInView={{ x: 80, opacity: 1 }}
                                transition={{ duration: 1 }}>
                                Everything you need to keep your project on track<br />
                                Explore Various options to Collaborating with teammates</motion.p>

                        </div>

                    </div>

                </div>
    )
}

export default CardStacks;
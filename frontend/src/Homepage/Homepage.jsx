import HomepageNav from './HomepageNav.jsx';
import Chart from '../Report/Chart.jsx'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from './Carousel.jsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import Stacks from './stacks.jsx';
import { BarChart3Icon, Settings, User } from "lucide-react";
import { Instagram, Linkedin, Facebook, Youtube, Twitter, CopyrightIcon } from 'lucide-react';


function Homepage() {

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -20]);
    const opacity = useTransform(scrollY, [0, 300], [0, 1]);

    const [cardClick, setCardClick] = useState(false);
    const [teamWork, setTeamWork] = useState(false);

    const gridVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <HomepageNav />


            <div className='container'>

                <div className='pt-28 relative mb-20 flex flex-row mt-12 bg-gradient-to-b from-gray-50  to-gray-50'>

                    <div className='z-10 ml-14 flex flex-col items-start justify-center w-1/2'>
                        <motion.h1 className='text-6xl font-bold text-start text-gray-700 '
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}>Welcome to ProjectHub</motion.h1>
                        <motion.p className='text-gray-700 py-3 text-3xl font-semibold text-start mt-2 mb-2'
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}>
                            Where your projects come to life and your team becomes one </motion.p>
                        <motion.div className='p-2 ml-40 rounded-3xl backdrop-blur-lg backdrop-opacity-25  hover:bg-slate-100/30 transition duration-200 hover:scale-105 flex items-center justify-center '
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ x: 50, scale: 1.2, opacity: 1 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}>
                            <Link to={'/Login'} className='text-gray-700 hover:text-gray-700 font-bold'>Start project</Link>
                        </motion.div>
                    </div>
                    <div className='z-0 inset-0 opacity-75 w-1/2 mr-4 relative'>
                        <motion.div
                            className="grid grid-cols-2 gap-6 grid-rows-2"
                            variants={gridVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 1 }}
                        >
                            <motion.img
                                src='./assets/chartdata.svg'
                                className='w-5/6 h-5/6 top-0 right-0'
                                whileHover={{ scale: 1.03 }}
                                alt="chart data"
                            />
                            <motion.img
                                src='./assets/groupwork.svg'
                                className='w-5/6 h-5/6'
                                whileHover={{ scale: 1.03 }}
                                alt="group work"
                            />
                            <motion.img
                                src='./assets/on_pc.svg'
                                className='w-5/6 h-5/6 ml-44'
                                whileHover={{ scale: 1.03 }}
                                alt="on pc"
                            />
                        </motion.div>
                    </div>
                </div>

                {/*
                <motion.div className='h-full flex flex-col items-center justify-center my-8'
                style={{ y, opacity }}
                >
                    <p className='font-semibold text-xl'>Explore and navigate with your team</p>
                    <div className='relative overflow-hidden w-full h-full py-6'>
                        <Carousel />
                        

                    </div>
                </motion.div>*/}
                <div className='flex flex-col justify-center items-center mt-10 mb-52 scroll-mt-10' id='Community'>
                    <h1 className='w-1/2 text-center mx-10 mt-10 mb-16 font-heading font-semibold text-2xl' style={{ lineHeight: '2' }}>Our Platform Is Designed to help you manage your projects with ease and efficiency, from initial planning to final delivery.</h1>
                    <div className='flex flex-row justify-center items-center mt-8 px-12'>
                        <div className='p-12 flex flex-col justify-start items-start bg-white rounded-lg shadow-lg mx-4 hover:shadow-xl transition-shadow duration-200'>
                            <img src="../assets/circle-check-regular-full.svg" alt="Task Management" className="mb-2 w-10 h-10" />
                            <h1 className='font-semibold py-3 font-heading text-lg'>Task Management</h1>
                            <p>Organize, assign, and Prioritize your tasks with task assignments and overall progress.</p>
                        </div>
                        <div className='p-12 flex flex-col justify-start items-start bg-white rounded-lg shadow-lg mx-4 hover:shadow-xl transition-shadow duration-200'>
                            <img src="../assets/users-line-solid-full.svg" alt="Task Management" className="mb-2 w-12 h-12" />
                            <h1 className='font-semibold py-3 font-heading text-lg'>Real-time Collaboration</h1>
                            <p>Work together with your team in real-time, share updates, and get feedback instantly.</p>
                        </div>
                        <div className='p-12 flex flex-col justify-start items-start bg-white rounded-lg shadow-lg mx-4 hover:shadow-xl transition-shadow duration-200'>
                            <img src="../assets/chart-simple-solid-full.svg" alt="Task Management" className="mb-2 w-10 h-10" />
                            <h1 className='font-semibold font-heading py-3 text-lg'>Insightful Analytics</h1>
                            <p>Gain valuable insights into your project’s progress with our analytics tools.</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row pr-20  mt-60 mb-60 scroll-mt-40' id='About'>
                    <div className='relative p-0 h-full flex flex-col items-center justify-center rounded-md mr-52 w-4/6'>
                        <Stacks />
                        <p className='absolute inset-0 z-50 text-slate-50 flex items-center justify-center text-center'>Create your own team and plan together<br />with our intuitive project management tools</p>
                    </div>

                    <section className='w-2/6'>

                        <motion.div className='ml-6 mx-3 flex flex-col items-center justify-self-end shadow-xl border text-black h-full rounded-md '
                            initial={{ rotateZ: 0 }}
                            whileInView={{ rotateZ: 20 }}
                            viewport={{ amount: 0.5 }}
                            transition={{ duration: 2, ease: "easeInOut" }}>
                            <motion.div className='z-10 bg-white flex flex-col items-center justify-self-end shadow-xl border text-black h-full rounded-md '
                                initial={{ rotateZ: 0 }}
                                whileInView={{ rotateZ: -7 }}
                                viewport={{ amount: 0.5 }}
                                transition={{ duration: 2, ease: "easeInOut" }}>
                                <motion.div className='p-10 z-10 bg-white flex flex-col items-center justify-self-end shadow-2xl border text-black h-full rounded-md '
                                    initial={{ rotateZ: 0 }}
                                    whileInView={{ rotateZ: -10 }}
                                    viewport={{ amount: 0.5 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}>
                                    <h1 className='text-2xl font-bold text-center mb-4'>Your Journey</h1>
                                    <ul className='z-20'>
                                        <li className='pb-1 font-sans'>Move with vision every step of the way</li>
                                        <li className='pb-1 font-sans'>Achieve your goals with confidence</li>
                                        <li className='pb-1 font-sans'>Make a difference in your daily progress</li>
                                    </ul>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </section>
                </div>
                
                
                <div className='pb-12 px-56 fflex items-center justify-center scroll-mt-10 mb-14'>
                    <div className='flex flex-col w-2/3 rounded-xl shadow-md py-4 ml-44 font-bold font-heading text-slate-950 text-opacity-85 items-center justify-center bg-white'>
                        <h1 className='my-2'>Ready to streamline your projects?</h1>
                        <p className='mb-2'>Join us today and take your project management to the next level!</p>
                        <div className='p-2 rounded-3xl backdrop-blur-lg backdrop-opacity-35  hover:bg-slate-100/50 transition duration-200 hover:scale-105  '>
                            <Link to={'/Login'} className='text-slate-900 font-normal hover:text-black'>Start project</Link>
                        </div>

                    </div>
                </div>
            </div>
            <footer className="border-t-2 bg-slate-100 pb-6 pt-6 scroll-mt-10" id='Contact'>
                <div className="flex flex-wrap gap-8 justify-space-between">
                    <div className="min-w-60 flex flex-col ml-36 gap-5" style={{ flex: '1 1 300px' }}>

                        <div className="flex gap-4 mb-2 mt-12">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='text-cyan-950 size-6 transition-colors duration-200 hover:text-blue-400'>
                                <Instagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='text-cyan-950 size-6 transition-colors duration-200 hover:text-blue-400'>
                                <Linkedin size={24} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='text-cyan-950 size-6 transition-colors duration-200 hover:text-blue-400'>
                                <Facebook size={24} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className='text-cyan-950 size-6 transition-colors duration-200 hover:text-blue-400'>
                                <Youtube size={24} />
                            </a>
                            <a href="#" className='text-cyan-950 size-6 transition-colors duration-200 hover:text-blue-400'>
                                <Twitter size={24} />
                            </a>
                        </div>

                        <div className='text-gray-700'>
                            <p className='mb-2'>We do not sell or share your personal information</p>
                            <a href="#" className="size-6 transition-colors duration-200" >Cookie settings</a>
                        </div>
                        <div className="flex flex-row items-start justify-start mt-4">
                            <p className='flex flex-row items-center' style={{ color: '#888' }}><CopyrightIcon size={16} /> 2025 ProjectHub, Inc.</p>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap mb-10 ml-56" style={{ flex: '3 1 600px' }}>
                        <div className='flex flex-col items-start justify-start mx-10'>
                            <div className="font-bold mb-2" style={{ color: '#222' }}>Company</div>
                            <a href="#">About us</a>
                            <a href="#">Careers</a>
                            <a href="#">Security</a>
                            <a href="#">Status</a>
                            <a href="#">Terms & privacy</a>
                            <a href="#">Your privacy rights</a>
                        </div>
                        <div className='flex flex-col items-start justify-start mx-10'>
                            <div className="font-bold mb-2" style={{ color: '#222' }}>Resources</div>
                            <a href="#">Help center</a>
                            <a href="#">Pricing</a>
                            <a href="#">Blog</a>
                            <a href="#">Community</a>
                            <a href="#">Integrations</a>
                            <a href="#">Affiliates</a>
                        </div>
                        <div className='flex flex-col items-start justify-start mx-12'>
                            <div className="font-bold mb-2" style={{ color: '#222' }}>For</div>
                            <a href="#">Enterprise</a>
                            <a href="#">Small business</a>
                            <a href="#">Personal</a>
                            <a href="#" className="mt-4 font-bold">Explore more &rarr;</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Homepage;
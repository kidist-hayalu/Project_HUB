import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SignIn from './SignIn.jsx';
import { motion } from "framer-motion";
import { BarChart3Icon } from "lucide-react";
function Login() {

    const [isOpen, setIsOpen] = useState(false);

    const [username, setUserName] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [notPassword, setNotPassword] = useState(false);

    function changeEmail(event) {
        setEmail(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    function changeConfirm(event) {
        setConfirm(event.target.value);
    }

    useEffect(() => {
        wrongPassword(email, password);
    }, [email, password]);

    function wrongPassword(email, password) {

        if (email === "" || password === "")
            setNotPassword(true);
        else
            setNotPassword(false);
    }

    function handleClick() {

        const newUser = { Email: email, Password: password }
        if (password === confirm) {
            setUser(n => [...n, newUser]);
            setEmail("");
            setPassword("");
            setConfirm("");
        }
        else {
            window.alert("Confirmed password doesn't match");
            setEmail("");
            setPassword("");
            setConfirm("");
        }

    }

    return (
        <div className="h-screen w-full bg-slate-300 flex justify-center items-center">
            <img src="./assets/OGZR8G0.jpg" className="absolute inset-0 object-cover w-full h-full -z-10" />
            <div className="rounded-full z-0 absolute bg-cyan-700 top-2 right-40 w-60 h-60 shadow-md"></div>
            <div className="rounded-full z-10 absolute bg-cyan-700 top-28 left-56 w-32 h-32 border border-cyan-700 shadow-md"></div>
            <div className="rounded-full z-0 absolute bg-cyan-700 top-2 left-28 w-52 h-52 shadow-md"></div>
            <div className="rounded-full z-0 absolute bg-cyan-700 bottom-2 left-40 w-56 h-56 shadow-md"></div>
            <div className="rounded-full z-0 absolute bg-cyan-700 bottom-24 right-14 w-40 h-40 shadow-md"></div>
            <div className="inset-0 z-20 relative flex flex-row items-center justify-center bg-gradient-to-bl from-slate-50 via-slate-100 to-slate-200 w-3/5 h-4/5 rounded-xl shadow-lg">
                <motion.div className={`w-1/2 top-0 left-0 items-center justify-center bg-gradient-to-br from-cyan-700 via-cyan-500 to-cyan-300 h-full p-6 ${isOpen ? 'z-10' : 'z-0'}`}
                    animate={{ x: isOpen ? '100%' : '0%' }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}>
                    <div className="w-full h-full flex flex-col items-center justify-center  shadow-xl rounded-lg bg-white/25">
                        {!isOpen &&( <div className="flex flex-col items-center"><p className="text-center text-white">Login to continue from where you've stopped <br />or create an account to explore</p>
                        <span onClick={() => { setIsOpen(!isOpen) }} className="mt-4 mb-2 cursor-pointer text-center text-white">Sign Up</span></div>)
                        }
                        {isOpen && (<div className="flex flex-col items-center"><p className="text-center text-white">Sign Up with a new account<br/> or</p>
                        <span onClick={() => { setIsOpen(!isOpen) }} className="mt-2 mb-2 cursor-pointer text-center text-white">Sign In</span></div>)}
                    </div>
                </motion.div>
                
                    <div className={`w-1/2 relative h-full flex flex-col items-center justify-center py-14  z-20  ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}  rounded-md`}>

                        <div className="mb-2 px-8 flex flex-col items-center justify-center">
                            <div className="mb-10">
                                <div className="flex items-center justify-center bg-gradient-to-tr from-cyan-500 via-cyan-500 to-cyan-600 p-0 mb-2 ml-4 w-1/2 rounded">
                                    <BarChart3Icon style={{ color: "white", width: `1.65rem`, height: `1.65rem` }} />
                                </div>
                                <span className="mb-14 pb-10 font-bold">ProjectHub</span>
                            </div>
                            <form className="pl-14">
                                <input type="text" value={email} onChange={changeEmail} placeholder="Enter your Email" className="my-4 border-solid border-black border border-opacity w-5/6 px-2 rounded" />
                                <input type="password" value={password} onChange={changePassword} placeholder="Enter Password" className="my-4 border-solid border-black border border-opacity w-5/6 px-2 rounded" />

                            </form>
                            <div className="flex flex-col items-center justify-center my-4">
                                <Link to={'/Dashboard'}>
                                    <button className="mb-2" onClick={(e) => { e.preventDefault(); /*wrongPassword(email, password);*/ }}>Login</button>
                                </Link>

                                {!notPassword &&
                                    (<>
                                        <p className="text-red-500">Incorrect email or password</p>
                                        <Link to="/ForgotPassword" className="mb-2">Forgot Password?</Link>
                                    </>)}



                            </div>

                            {/*isOpen && (<div className="fixed inset-0 w-full z-10">
                                <SignIn />
                                </div>)*/}

                        </div>
                    </div>
                    <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center top-0 left-0 py-14 transition-opacity duration-500 z-20 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}  rounded-md `}>
                        <div className="flex flex-col items-center py-12">
                            <div className="mb-6">
                                <div className="flex items-center justify-center bg-gradient-to-tr from-cyan-500 via-cyan-500 to-cyan-600 p-0 mb-2 ml-4 w-1/2 rounded">
                                    <BarChart3Icon style={{ color: "white", width: `1.65rem`, height: `1.65rem` }} />
                                </div>
                                <span className="mb-14 pb-10 font-bold">ProjectHub</span>
                            </div>
                            <form className="pl-28 pr-14">
                            <input type="text" value={email} onChange={changeEmail} placeholder="Enter your Email" className="my-4 border-solid border-black w-5/6 px-2 rounded border border-opacity-30" />
                            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter New Username" className="my-4 border-solid border-black w-5/6 px-2 rounded border border-opacity-30" />
                            <input type="password" value={password} onChange={changePassword} placeholder="Enter Password" className="my-4 border-solid border-black w-5/6 px-2 rounded border border-opacity-30" />
                            <input type="password" value={confirm} onChange={changeConfirm} placeholder="Confirm Password" className="my-4 border-solid border-black w-5/6 px-2 rounded border border-opacity-30" />
                           </form> 
                           <Link to={"/Dashboard"}>
                                <button onClick={handleClick} className="my-4">Sign Up</button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

export default Login;
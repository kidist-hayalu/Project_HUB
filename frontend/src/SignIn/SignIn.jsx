import React, { useState } from "react";
import { Link } from "react-router-dom";
import {BarChart3Icon} from "lucide-react";

function SignIn() {

    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

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

    function changeEmail(event) {
        setEmail(event.target.value);
    }

    function changePassword(event) {
        setPassword(event.target.value);
    }

    function changeConfirm(event) {
        setConfirm(event.target.value);
    }

    return (
        <div className="h-screen w-full bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 flex justify-center items-center">
            <div className="flex flex-col items-center py-12 w-1/4 bg-gradient-to-bl from-slate-200 via-slate-300 to-slate-400 rounded-md">
                <div className="mb-2">
                    <div className="flex items-center justify-center bg-gradient-to-tr from-blue-500 via-blue-500 to-blue-600 p-0 mb-2 ml-4 w-1/2 rounded">
                        <BarChart3Icon style={{color: "white", width: `1.65rem`, height: `1.65rem`}} />
                    </div>
                    <span className="mb-14 pb-10 font-bold">ProjectHub</span>
                </div>
                <input type="text" value={email} onChange={changeEmail} placeholder="Enter your Email" className="my-4 border-solid border-black w-5/6 px-2 rounded" />
                <input type="password" value={password} onChange={changePassword} placeholder="Enter Password" className="my-4 border-solid border-black w-5/6 px-2 rounded" />
                <input type="password" value={confirm} onChange={changeConfirm} placeholder="Confirm Password" className="my-4 border-solid border-black w-5/6 px-2 rounded" />
                <Link to={"/Dashboard"}>
                    <button onClick={handleClick} className="my-4">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default SignIn;
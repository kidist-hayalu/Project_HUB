import { BarChart3Icon, Settings, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Lists() {

    const navBar = [
        { id: 1, name: 'Projects', Link: '/Dashboard' },
        { id: 2, name: 'Teams', Link: '/Teams' },
        { id: 3, name: 'Reports', Link: '/Report' },
        { id: 4, name: 'Chats', Link: '/Chats' }];

    const navBarItems = navBar.map((bar) => <li key={bar.id} className="navBarItems hover:scale-110"><Link to={bar.Link}>{bar.name}</Link></li>);

    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [settings, setSettings] = useState(false);

    return (<>
        <header className='fixed top-0 left-0 w-full z-50 bg-white shadow-md bg-transparent '>
            <div className="sticky top-0">
                <nav className="nav py-2">
                    <div className="flex justify-normal ml-20">
                        <div className="flex-1 justify-self-start mr-2 bg-gradient-to-tr from-cyan-500 via-cyan-500 to-cyan-600 rounded">
                            <BarChart3Icon style={{ color: "white", width: `1.65rem`, height: `1.65rem` }} />
                        </div>
                        <div className="flex-1 text-2xl font-semibold font-heading ">
                            <h2 >ProjectHub</h2>
                        </div>

                    </div>
                    <ul className="list-none flex justify-center items-center gap-8 ml-96">{navBarItems}</ul>
                    <div className="flex flex-row items-center mr-20">
                        <div className="flex flex-row items-center mr-3">
                        <div className="bg-cyan-500 rounded-full p-1 ">
                            <User size={18} className="text-white"/>
                        </div>

                        <p className="ml-1 text-base hover:cursor-pointer hover:scale-110" onClick={() => setProfile(true)} onMouseLeave={()=> setProfile(false)}>Profile</p>
                        {profile && <div className="absolute top-12 right-16 w-48 bg-white border border-gray-300 rounded shadow-lg p-4">
                            <p className="font-bold mb-2">User Name</p>
                            <p className="text-sm text-gray-600 mb-4">User Email</p>
                        </div>}
                        </div>

                        <div>
                            <img src="/assets/gear-solid-full.svg" alt="Settings Icon" className="relative w-6 h-6 mr-4 hover:cursor-pointer hover:scale-110" onClick={() => setSettings(!settings)} onMouseLeave={() => setSettings(false)} />
                        </div>
                        {settings &&
                            <div className="absolute top-12 right-12 w-48 bg-white border border-gray-300 rounded shadow-lg p-4">
                                <p>Settings Menu</p></div>}
                        <div>
                            <img src="/assets/bell-solid-full.svg" alt="Notifications Icon" className="relative w-6 h-6 mr-4 hover:cursor-pointer hover:scale-110" onClick={() => setNotification(!notification)} onMouseLeave={() => setNotification(false)}/>
                        </div>
                        {notification &&
                            <div className="absolute top-12 right-0 w-64 bg-white border border-gray-300 rounded shadow-lg p-4">
                                <p>Notifications</p>
                            </div>}

                    </div>

                </nav>
            </div>
        </header>
    </>
    )
}

export default Lists
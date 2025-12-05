import { BarChart3Icon, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

function HomepageNav() {

    const navBar = [
        { id: 1, name: 'About Us', Link: '#About' },
        { id: 2, name: 'Community', Link: '#Community' },
        { id: 3, name: 'Services', Link: '#Services' },
        { id: 4, name: 'Contact', Link: '#Contact' }];

    const navBarItems = navBar.map((bar) => <li key={bar.id} className="navBarItems hover:scale-110"><a href={bar.Link}>{bar.name}</a></li>);

    return (
        <>
            <header className='fixed top-0 left-0 w-full z-50 bg-white shadow-md  '>
                <div className="sticky top-0">
                    <nav className="nav py-2">
                        <div className="ml-20 flex justify-normal">
                            <div className="flex-1 justify-self-start mr-2 bg-gradient-to-tr from-cyan-500 via-cyan-500 to-cyan-600 rounded">
                                <BarChart3Icon style={{ color: "white", width: `1.65rem`, height: `1.65rem` }} />
                            </div>
                            <div className="flex-1 text-2xl font-semibold font-heading ">
                                <h2 >ProjectHub</h2>
                            </div>

                        </div>
                        <ul className="list-none flex justify-center items-center gap-8 ml-96">{navBarItems}</ul>
                        <div className="flex flex-row items-center justify-center mr-24">
                            <div className="flex flex-row items-center ">
                                <div className="bg-cyan-500 rounded-full p-1 ">
                                    <User size={18} className="text-white"/>
                                </div>

                                <div className="ml-1 text-base hover:cursor-pointer hover:scale-110">
                                    <Link to={'/Login'} className="hover:text-current">
                                        Sign In
                                    </Link>
                                    </div>
                            </div>



                        </div>

                    </nav>
                </div>
            </header>
        </>
    )
}

export default HomepageNav;
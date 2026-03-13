import Data from '../assets/Data.json'
function Chat(){

    

    return(
        <>
        <Lists />
        <div className="container bg-cyan-700 flex flex-row h-screen">
            <div className="flex flex-col w-1/5 h-full">
                <div className="flex flex-col">
                <ul className="list-none">
                    {memberMessage}
                </ul>
                

                </div>
            </div>
            <div className=" bg-slate-100 rounded-bl-3xl w-4/5 flex items-start justify-center">
                <div className=" w-5/6 h-5/6 mt- z-10 overflow-hidden items-center justify-center">
                    <div className="bg-white">

                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default Chat;
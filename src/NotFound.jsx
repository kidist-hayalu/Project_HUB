import { Settings, WifiOff } from "lucide-react";

function NotFound(){

    return(<>
    <body>
        <div className="items-center text-center font-bold my-56 ">
            <WifiOff className="mx-auto mb-5" size={90}/>
            <h1> 404 PAGE NOT FOUND </h1>
            <h3> Please navigate to an existing page</h3>
        </div></body>
    </>)
}

export default NotFound;
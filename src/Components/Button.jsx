

function Button(){
    
    const handleClick = (e) => e.target.textContent = "Start";

    return(
    <button onClick={(e) => handleClick(e)}>New Project</button>
    );
}

export default Button
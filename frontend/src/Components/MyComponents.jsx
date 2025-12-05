import React, { use, useState } from 'react';

function MyComponents() {

    const [cars, setCars] = useState([]);
    const [carYear, setCarYear] = useState(new Date().getFullYear());
    const [carModel, setCarModel] = useState("");
    const [carMake, setCarMake] = useState("");
    
    function addCars(){
        const newCar = {Year: carYear, Model: carModel, Make: carMake};

        setCars(c => [...c, newCar]);
        setCarYear(new Date().getFullYear());
        setCarMake("");
        setCarModel("");
    }

    function removeCars(index){
        setCars(c => c.filter((_, i) => i!== index));
    }

    function changeYear(event){
        setCarYear(event.target.value);
    }

    function changeModel(event){
        setCarModel(event.target.value);
    }

    function changeMake(event){
        setCarMake(event.target.value);
    }

    return(
        <>
        <div className='Counter'>
            <h2>List of car objects </h2>
            <ul>
                {cars.map((car, index) => <li key={index} onClick={() => removeCars(index)}>
                    {car.Year} {car.Model} {car.Make}
                </li>)}
            </ul>
            <input type='number' placeholder={carYear} onChange={changeYear}/><br />
            <input type='text' placeholder='Enter car Make'onChange={changeMake}/><br />
            <input type="text" placeholder='Enter car Model' onChange={changeModel}/><br />
            <button onClick={addCars}>ADD CAR</button>
        </div>
        </>
    );
}

export default MyComponents
import React, { useEffect, useState, useRef, use } from 'react'
import {Chart as ChartJS} from 'chart.js/auto'

function StopWatch(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapseTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current);
        }

    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapseTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapseTime / 3600000);
        let minutes = Math.floor((elapseTime/60000)%60);
        let seconds = Math.floor((elapseTime/1000)%60);
        let miliseconds = Math.floor((elapseTime % 1000)/10);

        hours = String(hours).padStart(2, '0');

        return `${padZero(minutes)}:${padZero(seconds)}:${padZero(miliseconds)}`;
    }

    function padZero(number){
        if(number < 10){
            return `0` + number;
        }
        else{
            return number;
        }
    }


    return (
        <div className='stop-watch'>
            <div className='display-time'>{formatTime()}</div>
            <div className='btn-container'>
                <button className='start-btn' onClick={start}>Start</button>
                <button className='stop-btn' onClick={stop}>Stop</button>
                <button className='reset-btn' onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default StopWatch;
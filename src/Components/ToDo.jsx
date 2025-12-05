import React, { useState } from "react"

function ToDo() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function addTasks() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }

    }

    function deleteTask(index) {
        setTasks(t => t.filter((_, i) => i !== index));
    }

    function handleChange(event) {
        setNewTask(event.target.value);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    return (
        <div className="to-do-list">
            <h2 className="mb-4 mt-20 ml-12 font-heading font-semibold text-xl">TO DO LIST</h2>
            <div className="flex flex-row w-3/4 ml-12">
                <input type="text" placeholder="Enter a task" className="border px-2 w-full rounded" value={newTask} onChange={handleChange} />
                <button onClick={addTasks} className="addBtn">Add</button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <div className="task-list  w-5/6">
                        <li key={index} className="li flex flex-row items-center list-none bg-white shadow-sm ml-10"><div className="flex justify-self-start items-start ml-4">{task}</div>
                            <div className="ml-56 justify-self-end items-end flex flex-row">
                                
                                <img src="/assets/up-long-solid-full.svg" className="w-4 h-4 m-1 cursor-pointer" onClick={() => moveTaskUp(index)} />
                                <img src="/assets/down-long-solid-full.svg" className="w-4 h-4 m-1 cursor-pointer" onClick={() => moveTaskDown(index)} />
                                <img src="/assets/trash-solid-full.svg" className="w-5 h-5 m-1 cursor-pointer" onClick={() => deleteTask(index)} />
                            </div>
                        </li>

                    </div>)}
            </ol>

        </div>
    );
}
export default ToDo
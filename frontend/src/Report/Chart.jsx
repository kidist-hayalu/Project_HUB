import Data from "../assets/Data.json";
import { Chart as ChartJS, plugins} from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Report from "./Report";
import { useEffect, useState } from "react";



function Chart() {

    const [isProj, setIsProj] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const tracker1 = Data.find(data => data.ProjectTitle === selectedProject);

    useEffect(() => {
        if(selectedProject) {
            const project = Data.find(data => data.ProjectTitle === selectedProject);
            setSelectedProject(project);
        }

    }, [selectedProject]);

    function handleClick(){
        setIsProj(!isProj);
    }

    return (
        <>
            <h2>Progress Chart</h2>
                <Bar data={{
                    labels: Data.map((data) => data.ProjectTitle),
                    datasets: [
                        {
                            label: "Project Progress",
                            data: Data.map((data) => data.TeamMembers.map(member => member.progress)).flat(),
                            backgroundColor: [
                                "rgba(6, 182, 212, 1)",
                                "rgba(8,145,178,1)",
                                "rgba(14, 116, 144, 1)"
                                
                            ],
                            borderRadius: 5,

                        }
                    ]
                }} onClick={handleClick}/>
                {isProj &&
                <Bar data={{
                    labels: tracker1 ? tracker1.TeamMembers.map(member => member.name) : [],
                    datasets: [
                        {
                            label: "progress",
                            data: tracker1 ? tracker1.TeamMembers.map(member => member.progress) : [],
                            backgroundColor: [
                                "rgba(6, 182, 212, 1)",
                                "rgba(8,145,178,1)",
                                "rgba(14, 116, 144, 1)"
                            ],
                            borderRadius: 5,
                        }
                    ]
                }} options = {{
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: "top"
                                    },
                                    title: {
                                        display: true,
                                        text: tracker1 ? tracker1.ProjectTitle : "Project Progress Overview"
                                    }
                                }
                            }}/>
                }
                
        </>
    );
}

export default Chart;
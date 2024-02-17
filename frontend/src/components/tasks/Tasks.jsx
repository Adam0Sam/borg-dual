import { useState } from "react";
import TaskButton from "./TaskButton";
import RichText from "../rich-text/RichText"
import './tasks.css'

export default function Tasks({ taskLinks }) {
    const [activeTaskName, setActiveTaskName] = useState(null);
    const [activeContent, setActiveContent] = useState([]);

    const handleClick = (taskName, text) => {
        console.log('taskName', taskName);
        console.log('text', text);
        console.log('activeTaskName', activeTaskName);
        console.log('activeContent', activeContent);
        if(activeTaskName === taskName) {
            setActiveTaskName(null);
            setActiveContent([]);
            return;
        }
        setActiveTaskName(taskName);
        setActiveContent(text);
    }

    return (
        <div className="tasks">
            {
                taskLinks.map((link) => {
                    const task = link.task.data.attributes;
                    const taskNames = task.TaskExamples.map((example) => example.name);
                    return (
                        <div key={task.name} className="task">
                            <div className="task__info">
                                <h2 className="task-name">{task.name}</h2>
                                <h4 className="task-age">{task.age}</h4>
                            </div>
                            <div className="task__buttons">
                                {
                                    task.TaskExamples.map((example) => {
                                        return (
                                            <TaskButton
                                                key={example.name}
                                                example={example}
                                                isActive={activeTaskName === example.name}
                                                handleClick={() => handleClick(example.name, example.RichText)}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className={`task-content ${taskNames.includes(activeTaskName) ? 'visible' : ''}`}>
                                <RichText
                                    text={activeContent}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}
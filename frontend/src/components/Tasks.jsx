import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getStrapiURL } from "../utils/api";

import TaskButton from "./TaskButton";

export default function Tasks({ taskLinks, type }) {
    const [activeButtonName, setActiveButtonName] = useState('');

    const handleClick = (name) => {
        setActiveButtonName(name === activeButtonName ? '' : name);
    }

    if (type === "home") {
        return (
            <div className="button-container">
                {
                    taskLinks.map((link) => {
                        const task = link.task.data.attributes;
                        const coverImageUrl = task.TaskExamples[0].cover.data.attributes?.url;
                        return (
                            <NavLink
                                to="/task-examples"
                            >
                                <img
                                    className="task-block"
                                    src={getStrapiURL(coverImageUrl)}
                                >

                                </img>
                            </NavLink>
                        )
                    })
                }
            </div>

        )
    }

    return (
        <>
            {
                taskLinks.map((link) => {
                    const task = link.task.data.attributes;
                    return (
                        <div key={task.name}>
                            <h2>{task.name}</h2>
                            <h4>{task.age}</h4>
                            <div className="task-container">
                                {
                                    task.TaskExamples.map((example) =>
                                        < TaskButton
                                            key={example.name}
                                            example={example}
                                            isActive={example.name === activeButtonName}
                                            handleClick={() => handleClick(example.name)}
                                        />
                                    )
                                }
                            </div>
                            <p>--------------------------------</p>
                        </div>

                    )
                })
            }
        </>
    )

}
import { NavLink } from "react-router-dom";
import { getStrapiURL } from "../utils/api";

export default function TaskRow({ taskLinks }) {
    return (
        <div className="button-container">
            {
                taskLinks.map((link) => {
                    const task = link.task.data.attributes;
                    const coverImageUrl = task.TaskExamples[0].cover.data.attributes?.url;
                    return (
                        <NavLink
                            to="/task-examples"
                            key={link.id}>
                            <img
                                className="task-block"
                                src={getStrapiURL(coverImageUrl)}
                                alt={task.name}
                                key={task.name}>
                            </img>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
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
        </div >
    )
}
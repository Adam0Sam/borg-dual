import { NavLink } from "react-router-dom";
import { getStrapiURL } from "../../utils/api";

export default function TaskRow({ taskImages }) {
    console.log(taskImages)
    return (
        <div className="task-cover-container">
            {
                taskImages.map((image) => {
                    const imageUrl = image.attributes?.url || '';
                    return (
                        <NavLink
                            to="task-examples"
                            key={image.id}
                            className='task-cover'>
                            <img
                                src={getStrapiURL(imageUrl)}
                                alt={image.attributes.name}
                                key={image.attributes.name}>
                            </img>
                        </NavLink>
                    )
                })
            }
        </div>
    )
}
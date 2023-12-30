import { getStrapiURL } from "../utils/api"

import RichText from "./RichText"

export default function TaskButton({ example, isActive, handleClick }) {
    return (
        <>
            <img
                className="task-block"
                src={getStrapiURL(example.cover.data.attributes?.url)}
                alt={example.name}
                onClick={handleClick}
            >
            </img>
            <div className={`task-content ${isActive ? 'visible' : ''}`}>
                <RichText
                    text={example.RichText}
                />
            </div>
        </>
    )
}